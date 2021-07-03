const gitData = require('../models/gitDataModel');
const crawling = require('../functions/crawling');
const Approve = require('../models/approveModel');

async function GetPersonalGrass(req, res){
    try {
        const user_id = req.body.userId;
        const challenge_id = req.body.challengeId;
        const year = req.body.year;
        const month = req.body.month;

        // Approve 모델에서, 해당 유저, 해당 챌린지, 해당 년도,달에 대한 정보 싹 긁어오기 
        const result = await Approve.findByUserChallangeMonth(user_id, challenge_id, year, month);
        
        // 위에서 filter한 데이터에서 날짜만 남기기 (1)
        const dates = result.map(element => element.date);
        // crawling에서 해당 유저의 해당 달에 대한 날짜 가져오기 (2) (수빈이가 만든 함수 이용)

        // (1)이랑 (2)를 중복제거해서 한 배열에 담기 
        // 해당 달이 며칠인지에 따라서, 1~마지막일 까지의 커밋 여부를 true, false 배열로 만들기 

        // 위에서 만든 true, false 배열 return 
    }catch(err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}
 

// /grass/challenge api 처리 함수 여기에 만들어주세요!


module.exports = {
    getPersonalGrass: GetPersonalGrass,
}