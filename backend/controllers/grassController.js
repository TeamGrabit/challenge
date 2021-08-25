const gitData = require('../models/gitDataModel');
const crawling = require('../functions/crawling');
const Approve = require('../models/approveModel');
const Challenge = require('../models/challengeModel');
const { CreateGitData } = require('../functions/crawling');
const { ObjectID } = require('bson');

function dateToString(date) { // 시간 빼고 오직 년월일만 
	var year = date.getFullYear();
	var month = date.getMonth()+1;
    if (month < 10) month = '0'+month;
	var day = date.getDate();
	if (day < 10) day = '0'+day;
	return year+'-'+month+'-'+day;
}

// 유저 한명의 month-2,month-1,month 세 달치 commit 기록을 int배열로 반환. 
// 0 : 안함(벌금), 1 : 함+승인, 2 : 패스, 3 : 휴가
// return 형태 : [[전전달],[전달],[이번달]]
async function GetCommitList(user_id, challenge_id, year, month){
    // Approve 모델에서, 해당 유저, 해당 챌린지, 해당 년도,달에 대한 정보 긁어오기 
    const result = await Approve.findByUserChallangeMonth(user_id, challenge_id, year, month);
	const approve = result.map(element => { return {date:dateToString(element.date), type:element.type} });

    // 해당 유저의 gitData에서 세 달에 대한 날짜 가져오기
    var gitAll = await gitData.findOneByUserId(user_id);
    if(gitAll === null){
        await CreateGitData(user_id);
        gitAll = await gitData.findOneByUserId(user_id);
    }
    const git = await crawling.getCommitDate(gitAll.commit_data, year, month);

	// 오름차순 정렬 
	approve.sort(function(a,b) { 
		if (a.date > b.date) return 1;
		else if (a.date < b.date) return -1;
		else return 0;
	})
	git.sort();
	
	// 해당 챌린지의 pass횟수 조회 
	const pass = 4; // TODO : 챌린지에 pass 필드 생기면 그거 가져오는걸로 변경 

    // 세달동안 , 1~마지막일 까지의 커밋 여부를 달별로 int 배열로 만들기 
    const dateCounts = [new Date(year, month-2, 0).getDate(),new Date(year, month-1, 0).getDate(),new Date(year, month, 0).getDate()];
    const isCommitedList = []; 
    let tempDate = new Date(year, month-3);
	let approveIdx = 0; let gitIdx = 0; let count = 0;
    dateCounts.forEach(dateCount => {
		let monthList = new Array(dateCount).fill(0);
		count = 0;
        for(let i=0; i<dateCount; i++){
			const temp = dateToString(tempDate);
			// approve에 있는 날짜면
            if (approveIdx < approve.length && temp === approve[approveIdx].date) {
				if (approve[approveIdx].type === 1) monthList[i] = 3; // 휴가
				else monthList[i] = 1; // 승인
				approveIdx++;
			}
			// git data에 있는 날짜면
			else if (gitIdx < git.length && temp === git[gitIdx]) {
				monthList[i] = 1;
				gitIdx++;
			}
			// 두 군데 아무데도 없으면 (안한 날)
			else {
				count++;
				if (pass >= count) monthList[i] = 2; // pass 횟수 만큼은 2로 바꿔주기 
			}
			tempDate.setDate(tempDate.getDate()+1);
        }
        isCommitedList.push(monthList);
    });
    return isCommitedList;
}

// 챌린지 내 모든 유저의 세달치 기록을 합쳐서 return
// return 형태 : [[전전달],[전달],[이번달]] 
// 배열 값의 의미 : 해당 날짜에 커밋한 그룹원 수
async function GetCommitLists(users, challenge_id, year, month){
	let isCommitedList = await GetCommitList(users[0], challenge_id, year, month);
	isCommitedList = isCommitedList.map((month) => month.map((day) => {if (day === 1) return day; else return 0;}));

	for(let i=1; i<users.length; i++){
		const temp = await GetCommitList(users[i], challenge_id, year, month);
		isCommitedList = isCommitedList.map((month, i) => month.map((day, j) => {if (temp[i][j] === 1) return day+1; else return day;}));
	}
	//console.log(isCommitedList);
	return isCommitedList;
}

// 챌린지 내 다른 유저의 세 달치 기록을 각각 return
// return 형태 : [[[전전달],[전달],[이번달]], [유저2의 기록], ...]
// 0 : 안함(벌금), 1 : 함+승인, 2 : 패스, 3 : 휴가
async function GetOtherCommitLists(users, challenge_id, year, month){
	var isCommitedList = [];
	for(let i=0; i<users.length; i++){
		isCommitedList.push(await GetCommitList(users[i], challenge_id, year, month));
	}
	return isCommitedList;
}

// /grass/personal api 처리 함수, user grass 출력
async function GetPersonalGrass(req, res){
    try {
		const { user_id, challenge_id, year, month } = req.query;
        const isCommitedList = await GetCommitList(user_id, challenge_id, year, month);
        res.status(201).json({isCommitedList: isCommitedList});
    }catch(err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}

// /grass/challenge api 처리 함수, 챌린지별 grass 출력
async function GetChallengeGrass(req, res){
    try {
		const { challenge_id, year, month } = req.query;
		const id = ObjectID(challenge_id);
	
		const chData = await Challenge.findById(id).then(data => data);
        
        const isCommitedList = await GetCommitLists(chData.challenge_users, challenge_id, year, month);
        res.status(201).json({isCommitedList: isCommitedList});
    }catch(err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}

// /grass/other api 처리 함수, 챌린지별 grass 출력
async function GetOtherGrass(req, res){
    try {
		const { user_id, challenge_id, year, month } = req.query;
		const id = ObjectID(challenge_id);
	
		const chData = await Challenge.findById(id).then(data => data);

		// 이 요청을 보내는 유저는 삭제하기!
		let others = chData.challenge_users;
		for (let i=0; i<others.length; i++) {
			if(others[i] === user_id) {
				others.splice(i,1);
			}
		}
        const isCommitedList = await GetOtherCommitLists(others, challenge_id, year, month);
        res.status(201).json({OtherList: isCommitedList});
    }catch(err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}


module.exports = {
    getPersonalGrass: GetPersonalGrass, // api 처리
	getChallengeGrass: GetChallengeGrass,
	getOtherGrass: GetOtherGrass,
    getCommitList: GetCommitList, // function  (다른 컨트롤러에서 가져다써도됨)
}