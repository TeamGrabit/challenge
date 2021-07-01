const User = require('../models/userModel');
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
async function SendAuthMail(req, res){
    try {
        console.log("send auth mail");
        //TODO : 이미 가입된 email이면 인증메일 안보내도록 처리

        const email = req.body.email;
        const auth_num = 1234; // TODO : random 생성으로 바꾸기 
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `1day 1commit <${process.env.NODEMAILER_USER}>`, // sender address
            to: email, // list of receivers
            subject: "이메일 인증을 통해 회원가입을 완료해주세요", // Subject line
            text: `인증번호 : ${auth_num}`, // plain text body
        });
        console.log(info);

        res.status(201).json({
            result: 'success',
        });
        // 인증메일 모델에 email, auth_num 저장 
    } catch(e) {
        res.status(401).json({ error: err});
    }
}

module.exports = {
    sendAuthMail : SendAuthMail,
}