const AuthMail = require('../models/authMailModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const Challenge = require('../models/challengeModel');
const { ObjectID } = require('mongodb');

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

async function InviteUser(req, res) {
	try {
		const { user_email, challenge_id } = req.body;
		const id = ObjectID(challenge_id)
		const challenge = await Challenge.findById(id).then((ch) => { return ch })

		transporter.sendMail({
			from: `1day 1commit <${process.env.NODEMAILER_USER}>`, // sender address
			to: user_email, // list of receivers
			subject: `1day 1commit "${challenge.name}"에서 당신을 초대했습니다.`, // Subject line
			text: `링크 : http://localhost:3000/challenge/info/${challenge._id} \n비밀번호 : ${challenge.private_key}`, // plain text body
		}, (err, info) => {
			if (err) {
				res.status(401).json({ error: err })
			} else {
				res.status(200).json({ result: true })
			}
		});

	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}

}

function makeAuthNum(n) {
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}
	var value = "";
	for (var i = 0; i < n; i++) {
		value += getRandomInt(0, 10);
	}
	return value;
}
async function SendAuthMail(req, res) {
	try {
		// req type검사
		// type: 0 => 가입시 이메일 인증 
			//이미 가입된 email이면 인증메일 안보내도록 처리
		// type: 1 => 비밀번호 찾기, 아이디 찾기 이메일 인증 
			// 이미 가입된 이메일에 대해서만 인증메일 보내도록 처리
		console.log("send auth mail");
		const type = req.body.type;
		const email = req.body.email;
		const auth_num = makeAuthNum(4); // random 생성
		const user = await User.findOne({ "user_email": email });
		if (type === 0) {
			if (user) {
				res.status(201).json({
					result: 'already exists',
				});
				return;
			}
			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: `1day 1commit <${process.env.NODEMAILER_USER}>`, // sender address
				to: email, // list of receivers
				subject: "[세살버릇 여든까지] 이메일 인증을 통해 회원가입을 완료해주세요.", // Subject line
				text: `인증번호 : ${auth_num}`, // plain text body
			});
			// console.log(info);
		}
		else if (type === 1) {
			if (!user) {
				res.status(201).json({
					result: 'user not exists',
				});
				return;
			}
			let info = await transporter.sendMail({
				from: `1day 1commit <${process.env.NODEMAILER_USER}>`, // sender address
				to: email, // list of receivers
				subject: "[세살버릇 여든까지] 이메일 인증번호입니다.", // Subject line
				text: `인증번호 : ${auth_num}`, // plain text body
			});
		}

		// 인증메일 모델에 email, auth_num 저장 
		await AuthMail.create(email, auth_num);
		res.status(201).json({
			result: 'success',
		});
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function CheckAuthNum(req, res) { // 이거는 type상관없이 가능
    try {
        const email = req.body.email;
        const input_num = req.body.auth_num;

		const info = await AuthMail.findRecentByEmail(email);
		//console.log(info);
		if (info === undefined) throw "메일 정보 없음";
		if (info.auth_num === input_num) {
			// 인증 성공
			// 해당 email 관련 데이터 스키마에서 삭제 
			console.log("success");
			await AuthMail.deleteMany({ "email": email });
			console.log(await AuthMail.find({ "email": email }));
			res.status(201).json({ result: true });

		}
		else {
			// 인증 실패         
			res.status(201).json({ result: false });
		}
	} catch (e) {
		console.log(e);
		res.status(401).json({ error: e });
	}
}

async function SendId(req,res) { // 메일로 id 보내주기
	try{
		const email = req.params.email;
		//console.log(email);
		const user = await User.findOne({"user_email":email});
		const user_id = user.user_id;
		//console.log(user_id);
		let info = await transporter.sendMail({
			from: `1day 1commit <${process.env.NODEMAILER_USER}>`, // sender address
			to: email, // list of receivers
			subject: "[세살버릇여든까지] 회원님의 아이디입니다.", // Subject line
			text: `아이디 : ${user_id}`, // plain text body
		});
		res.status(201).json({result: true});
	} catch (e) {
		console.log(e);
		res.status(401).json({ error: e });
	}
}
module.exports = {
	sendAuthMail: SendAuthMail,
	checkAuthNum: CheckAuthNum,
	inviteUser: InviteUser,
	sendId: SendId,
}
