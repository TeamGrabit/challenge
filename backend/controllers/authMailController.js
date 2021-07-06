const AuthMail = require('../models/authMailModel')
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com", // gmail로 host 설정
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        // Gmail 주소 입력, 'testmail@gmail.com'
        user: process.env.NODEMAILER_USER,
        // Gmail 패스워드 입력
        pass: process.env.NODEMAILER_PASS,
    },
});

function makeAuthNum(n){
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
      }
    var value="";
    for (var i=0;i<n;i++){
        value += getRandomInt(0,10);
    }
    return value;
}
async function SendAuthMail(req, res){
    try {
        console.log("send auth mail");
        //TODO : 이미 가입된 email이면 인증메일 안보내도록 처리

        const email = req.body.email;
        const auth_num = makeAuthNum(4); // random 생성
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `1day 1commit <${process.env.NODEMAILER_USER}>`, // sender address
            to: email, // list of receivers
            subject: "이메일 인증을 통해 회원가입을 완료해주세요", // Subject line
            text: `인증번호 : ${auth_num}`, // plain text body
        });
        // console.log(info);
        
        // 인증메일 모델에 email, auth_num 저장 
        await AuthMail.create(email, auth_num);
        res.status(201).json({
            result: 'success',
        });
    } catch(err) {
        console.log(err);
        res.status(401).json({ error: err});
    }
}

async function CheckAuthNum(req, res) {
    try {
        const email = req.body.email;
        const input_num = req.body.authNum;

        const info = await AuthMail.findRecentByEmail(email);
        if (info.auth_num == input_num) {
            // 인증 성공
            // 해당 email 관련 데이터 스키마에서 삭제 
            AuthMail.deleteMany({"email": email});

            res.status(201).json({result: true});

        } 
        else {
            // 인증 실패         
            res.status(201).json({result: false});
        }
    } catch(e) {
        res.status(401).json({ error: err});
    }
}
module.exports = {
    sendAuthMail : SendAuthMail,
    checkAuthNum : CheckAuthNum,
}