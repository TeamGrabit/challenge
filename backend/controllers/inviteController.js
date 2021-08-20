const User = require('../models/userModel');
const Challenge = require('../models/challengeModel');
const Alarm = require('../models/alarmModel');
const Invite = require('../models/inviteModel');
const authMailController = require('./authMailController');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongodb');

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

async function CreateInvite(req, res) {
    try {
		const ch_id = req.params.challenge_id
		const challenge_id = ObjectId(ch_id)
        const { invite_email, send_user } = req.body;

        const user = await User.findOneByUsername(send_user);
        if(user === null) throw 'not exist user'

		const challenge = await Challenge.findById(challenge_id);
		if(challenge === null) throw 'not exist challenge'

		const auth_num = authMailController.makeAuthNum(12)

		const result = await transporter.sendMail({
			from: `1day 1commit <${process.env.NODEMAILER_USER}>`, 
			to: invite_email,
			subject: `"${challenge.name}"에서 당신을 초대했습니다.`,
			text: `링크 : http://localhost:5000/challenge/${challenge_id}/invite/${auth_num}`,
		}, (err, info) => {
			if(err) {
				console.log(err)
				return false
			}
		});
		if(result === false) throw "메일 전송 실패"

		const invited_user = await User.findOne({user_email: invite_email})		// 가입된 유저면 알람에도 추가
		if(invited_user) await Alarm.create(invited_user.user_id, `${challenge.name}에서 당신을 초대했습니다.`, `http://localhost:5000/challenge/${challenge_id}/invite/${auth_num}`);

		await Invite.create(invite_email, ch_id, send_user, auth_num)
		res.status(201).json({result: true})
    } catch (err) {
		console.log(err);
        res.status(401).json({ error: err });
    }
}

async function DeleteInvite(req, res) {		// mail 링크 누를 시 기능 구현
	res.send("mail check")
}

module.exports = {
    createInvite: CreateInvite,
	deleteInvite: DeleteInvite,
};