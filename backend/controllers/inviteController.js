const User = require('../models/userModel');
const Challenge = require('../models/challengeModel');
const challengeController = require('./challengeController');
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
		if (user === null) throw 'not exist user'

		const challenge = await Challenge.findById(challenge_id);
		if (challenge === null) throw 'not exist challenge'

		const invited_user = await User.findOne({ user_email: invite_email })
		if (challenge.challenge_users.findIndex((v) => v === invited_user.user_id) >= 0) throw 'already join'

		const auth_num = authMailController.makeAuthNum(12)

		const result = await transporter.sendMail({
			from: `1day 1commit <${process.env.NODEMAILER_USER}>`,
			to: invite_email,
			subject: `"${challenge.name}"에서 당신을 초대했습니다.`,
			text: `링크 : https://alsolvechallenge.herokuapp.com/challenge/${challenge_id}/invite/${auth_num}`,
		}, (err, info) => {
			if (err) {
				console.log(err)
				return false
			}
		});
		if (result === false) throw "메일 전송 실패"

		// 가입된 유저면 알람에도 추가
		if (invited_user) await Alarm.create(invited_user.user_id, `${challenge.name}에서 당신을 초대했습니다.`, `https://alsolvechallenge.herokuapp.com/challenge/${challenge_id}/invite/${auth_num}`);

		await Invite.create(invite_email, ch_id, send_user, auth_num)
		res.status(201).json({ result: true })
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function DeleteInvite(req, res) {		// mail 링크 누를 시 기능 구현
	try {
		const ch_id = req.params.challenge_id;
		const auth_num = req.params.auth_num;
		const challenge_id = ObjectId(ch_id);

		const invite = await Invite.findOne({ auth_num: auth_num })
		if (invite === null) throw "잘못된 요청입니다."

		const challenge = await Challenge.findById(challenge_id)
		if (challenge === null || ch_id !== invite.challenge_id) throw "유효하지 않은 challenge입니다."

		const user = await User.findOne({ user_email: invite.invite_email });
		console.log(user)
		if (user === null) throw "유효하지 않은 user입니다."

		const session = await mongoose.startSession(); // 무결성 보장을 위한 transation 처리
		try {
			await session.withTransaction(async () => {
				const join_result = await challengeController.join(challenge, user)
				console.log(join_result)
				if (join_result === false) throw "challenge와 user에 추가 실패"

				// challenge에서 여러번 보낸 초대가 있으면 전부 삭제함.
				await Invite.deleteMany({ $and: [{ invite_email: invite.invite_email }, { challenge_id: ch_id }] })
			});
			session.endSession();
		}
		catch (err) {
			await session.abortTransaction();
			session.endSession();
			throw new Error("transaction 처리 에러");
		}

		res.status(201).json({ result: "성공" });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

module.exports = {
	createInvite: CreateInvite,
	deleteInvite: DeleteInvite,
};