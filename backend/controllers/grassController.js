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

// month-2,month-1,month 세 달치 commit 기록을 true, false배열로 반환. 
// return 형태 : [[전전달],[전달],[이번달]]
async function GetCommitList(user_id, challenge_id, year, month){
    // Approve 모델에서, 해당 유저, 해당 챌린지, 해당 년도,달에 대한 정보 긁어오기 
    const result = await Approve.findByUserChallangeMonth(user_id, challenge_id, year, month);
        
    // 위에서 filter한 데이터에서 날짜만 남기기 
    const approve = result.map(element => dateToString(element.date));
    //console.log(approve);

    // 해당 유저의 gitData에서 세 달에 대한 날짜 가져오기
    var gitAll = await gitData.findOneByUserId(user_id);
    if(gitAll === null){
        await CreateGitData(user_id);
        gitAll = await gitData.findOneByUserId(user_id);
    }
    const git = await crawling.getCommitDate(gitAll.commit_data, year, month);
    //console.log(git);

    // approve랑 git 중복제거해서 한 배열에 담기 
    const dates = Array.from(new Set(approve.concat(git))).sort();
    //console.log(dates);

    // 세달동안 , 1~마지막일 까지의 커밋 여부를 달별로 true, false 배열로 만들기 
    const dateCounts = [new Date(year, month-2, 0).getDate(),new Date(year, month-1, 0).getDate(),new Date(year, month, 0).getDate()];
    const isCommitedList = []; 
    var tempDate = new Date(year, month-3);
    dateCounts.forEach(dateCount => {
        var monthList = new Array(dateCount).fill(false);
        for(var i=0; i< dateCount;i++){
            if (dates.find(element => element == dateToString(tempDate)) !== undefined)
                monthList[i] = true;
            tempDate.setDate(tempDate.getDate()+1);
        }
        isCommitedList.push(monthList);
    });
    return isCommitedList;
}

// month-2,month-1,month 세 달치 commit 기록을 true, false배열로 반환. 
// return 형태 : [[전전달],[전달],[이번달]]
// 챌린지 내 모든 유저의 기록을 합쳐서 출력
async function GetCommitLists(users, challenge_id, year, month){
	var dates = [];
	for(let i=0; i<users.length; i++){
		// Approve 모델에서, 해당 유저, 해당 챌린지, 해당 년도,달에 대한 정보 긁어오기 
    	const result = await Approve.findByUserChallangeMonth(users[i], challenge_id, year, month);
		const approve = result.map(element => dateToString(element.date));

		// 해당 유저의 gitData에서 세 달에 대한 날짜 가져오기
		var gitAll = await gitData.findOneByUserId(users[i]);
		if(gitAll === null){
			await CreateGitData(users[i]);
			gitAll = await gitData.findOneByUserId(users[i]);
		}
		const git = await crawling.getCommitDate(gitAll.commit_data, year, month);

		// approve, git, 모든 user 중복 제거해서 담기
		const temp = Array.from(new Set(dates.concat(approve))).sort()
		dates = Array.from(new Set(temp.concat(git))).sort();
	}

	// 세달동안 , 1~마지막일 까지의 커밋 여부를 달별로 true, false 배열로 만들기 
	const dateCounts = [new Date(year, month-2, 0).getDate(),new Date(year, month-1, 0).getDate(),new Date(year, month, 0).getDate()];
	const isCommitedList = []; 
	var tempDate = new Date(year, month-3);
	dateCounts.forEach(dateCount => {
		var monthList = new Array(dateCount).fill(false);
		for(var i=0; i< dateCount;i++){
			if (dates.find(element => element == dateToString(tempDate)) !== undefined)
				monthList[i] = true;
			tempDate.setDate(tempDate.getDate()+1);
		}
		isCommitedList.push(monthList);
	});

	return isCommitedList;
}

// month-2,month-1,month 세 달치 commit 기록을 true, false배열로 반환. 
// return 형태 : [[[전전달],[전달],[이번달]], [유저2의 기록], ...]
// 챌린지 내 다른 유저의 기록을 출력
async function GetOtherCommitLists(users, challenge_id, year, month){
	const dateCounts = [new Date(year, month-2, 0).getDate(),new Date(year, month-1, 0).getDate(),new Date(year, month, 0).getDate()];
	var dates = [];
	var isCommitedList = [];
	for(let i=0; i<users.length; i++){
		// Approve 모델에서, 해당 유저, 해당 챌린지, 해당 년도,달에 대한 정보 긁어오기 
    	const result = await Approve.findByUserChallangeMonth(users[i], challenge_id, year, month);
		const approve = result.map(element => dateToString(element.date));

		// 해당 유저의 gitData에서 세 달에 대한 날짜 가져오기 (데이터가 없으면 만들어줌)
		var gitAll = await gitData.findOneByUserId(users[i]);
		if(gitAll === null){
			await CreateGitData(users[i]);
			gitAll = await gitData.findOneByUserId(users[i]);
		}
		const git = await crawling.getCommitDate(gitAll.commit_data, year, month);

		// approve, git 중복 제거해서 담기
		dates[i] = Array.from(new Set(approve.concat(git))).sort();

		let tempMonth = [];
		var tempDate = new Date(year, month-3);
		dateCounts.forEach(dateCount => {
			var monthList = new Array(dateCount).fill(false);
			for(var j=0; j< dateCount; j++){
				if (dates[i].find(element => element == dateToString(tempDate)) !== undefined)
					monthList[j] = true;
				tempDate.setDate(tempDate.getDate()+1);
			}
			tempMonth.push(monthList);
		});
		isCommitedList[i] = tempMonth;
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