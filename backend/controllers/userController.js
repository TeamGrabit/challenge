const User = require('../models/userModel');
const GitData = require('../models/gitDataModel');
const jwt = require('jsonwebtoken');
const Challenge = require('../models/challengeModel');
const { ObjectID } = require('bson');
const { find } = require('../models/userModel');
const { json } = require('body-parser');
const { CreateGitData } = require('../functions/crawling');
const mongoose = require('mongoose');

require("dotenv").config();
const SecretKey = process.env.SECRET_KEY;
function getCurrentDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var today = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var milliseconds = date.getMilliseconds();
	return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));

}

async function CreateUser(req, res, next) {
	try {
		console.log(req.body);
		const { user_id, user_pw, user_name, user_email, git_id } = req.body;
		let today = getCurrentDate();
		const in_date = today;
		const last_update = today;
		const user = await User.findOneByUsername(user_id);
		if (user) {
			console.log(user);
			throw 'user exists';
		} else {
			await User.create(user_id, user_pw, user_name, user_email, git_id, in_date, last_update);
			await CreateGitData(user_id);
		}
		res.status(201).json({ result: true });
	} catch (err) {
		res.status(401).json({ error: err });
		next(err);
	}
}

async function CheckIdDupl(req, res) { // id 중복체크용
	try {
		const input_id = req.params.user_id;
		console.log(input_id);
		const result = await User.getUserById(input_id);
		if (result) { // 중복 
			res.status(201).json({ duplicate: true });
		}
		else {
			res.status(201).json({ duplicate: false });
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}

}
function DeleteUser(req, res) {
	var _id = req.params.id;
	var deluser = User.findOne({ user_id: _id });
	var chlist = deluser.ch_list;
	var length = len(chlist);

	for (let i = 0; i < length; i++) {
		OutChallenge({ userId: _id, challengeId: chlist[i] },)

	}

	User.findOneAndDelete({ user_id: _id }, function (err, docs) {
		if (err) {
			console.log(err)
		}
		else {
			console.log("Deleted : ", docs);
		}
	});
	
	GitData.findOneAndDelete({ user_id: _id }, function (err,dos) {
		if (err) { console.log(err) }
		else { console.log("Deleted: ", docs); }
	})
	res.end('Delete')

}

function GetChallengeList(req, res) {		// userId를 기반으로 user의 ch_list반환.
	const userId = req.params.userId;

	var challengeList = [];

	try {
		const checkDate = async (id) => {
			const changeState = async () => {
				await Challenge.findByIdAndUpdate(id, {
					$set: {
						state: 1
					}
				}, { new: true, useFindAndModify: false }, (err, doc) => {
					if (err) {
						console.log(err)
					}
					else {
						console.log("challenge state 수정")
						console.log(doc._id)
					}
				})
			}
			const challenge = await Challenge.findById(id)
			console.log(challenge)
			const currentDate = new Date()
			if (challenge["challenge_end"]) {
				if (challenge.challenge_end.valueOf() < currentDate.valueOf()) changeState()
			}
		}

		const addChallenge = (ch_id) => {
			const challengeId = ObjectID(ch_id)
			return new Promise((resolve) => {
				Challenge.findById(challengeId)
					.then((Info) => resolve(Info));
			})
		}

		const changeState = async (list) => {
			const promises = list.map((ch_id) => checkDate(ch_id))
			await Promise.all(promises)
			return list
		}

		const getList = async (list) => {
			const promises = list.map(async ch_id => {
				return await addChallenge(ch_id)
					.then(Info => Info)
			})

			const results = await Promise.all(promises)
			results.forEach(Info => {
				var infoList = {
					name: Info.name,
					state: Info.state,
					challenge_id: Info._id,
					challenge_leader: Info.challenge_leader
				}
				challengeList.push(infoList)
			})
			return challengeList
		}

		User.findOneByUsername(userId)
			.then((user) => {
				if (user) {
					list = user.ch_list;
					return list
				} else {
					throw new Error('not exist user')
				}
			})
			.then((id_list) => changeState(id_list))
			.then((list) => getList(list))
			.then((infomations) => {
				console.log(infomations)
				res.send(infomations)
			})
	} catch (err) {
		console.log(err)
		res.send(err);
	}

}

async function OutChallenge(req, res) {
	//user의 ch_list에서 해당 ch 삭제
	//ch의 challenge_user에서 해당 user 삭제 
	// 둘다 성공시에만 success return (transaction 처리)
	try {
		const { user_id, challenge_id } = req.body;
		const ch_id = ObjectID(challenge_id);

		const ch = await Challenge.findById(ch_id);

		// 해당 user가 챌린지 장이면 err
		if (ch.challenge_leader === user_id) throw new Error('챌린지 장은 탈퇴가 불가능합니다.');

		const user = await User.findOneByUsername(user_id);
		
		// user한테 ch가 없거나, ch에 user가 없으면 error
		if (user.ch_list.length === 0 || user.ch_list.find(element => element === challenge_id) === undefined) throw new Error('user DB에 해당 challenge 없음.');
		if (ch.challenge_users.length === 0 || ch.challenge_users.find(element => element === user_id) === undefined) throw new Error('challege DB에 해당 user 없음.');

		const session = await mongoose.startSession(); // 무결성 보장을 위한 transation 처리
		await session.withTransaction(async () =>  {
			//ch의 challenge_user에서 해당 user 삭제 
			await Challenge.findOneAndUpdate(
				{_id : ch_id},
				{$pull: {'challenge_users': user_id, 'commitCount': {'user_id' :user_id}},
				$inc: {'challenge_user_num' : -1}}
			);
			//user의 ch_list에서 해당 ch 삭제
			await User.findOneAndUpdate(
				{'user_id':user_id},
				{$pull: {'ch_list': challenge_id}}
			);
		});
		await session.endSession();	
		res.send({"success":true});
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err.message });
	}
}

async function LogIn(req, res, next) {
	const id = req.body.user_id;
	const pw = req.body.user_pw;
	console.log("id, pw :" + id + " " + pw);
	// DB에서 user 정보 조회 
	try {
		const user = await User.loginCheck(id, pw);
		// 해당 user 정보 속 pw와 입력으로 들어온 pw가 같은지 확인
		console.log(user);
		//같으면 jwtToken 발급 
		if (user === false) {
			res.status(400).json({ error: 'wrong pw' });
			return;
		}
		if (user) {
			// const token = jwt.createToken(user);
			const token = jwt.sign({
				user_id: user.user_id,
				git_id: user.git_id,
			}
				, SecretKey, {
				expiresIn: '1h'
			}
			);
			res.cookie('user', token, { sameSite: 'none', secure: true });
			console.log('git data 교체 --------------------',id)
			await CreateGitData(id);
			res.status(201).json({
				result: true
			});
		}
		else
			res.status(400).json({ error: 'invalid user' });
	} catch (err) {
		res.status(401).json({ error: err });
		console.error(err);
		next(err);
	}
}


function LogOut(req, res, next) {
	try {
		console.log("logout");
		res.cookie("user", "", { sameSite: 'none', secure: true }).json({ logoutSuccess: true });
	} catch (err) {
		res.status(401).json({ error: 'error' });
		console.error(err);
		next(err);
	}
}
function VerifyToken(req, res, next) {
	try {
		console.log("verify Token");
		// console.log(req.cookies);
		// console.log(req.cookies.user);
		const clientToken = req.cookies.user;

		const decoded = jwt.verify(clientToken, SecretKey);
		console.log(decoded);
		if (decoded) {
			// console.log(decoded);
			// res.locals.userId = decoded.user_id;
			res.status(201).json({ userId: decoded.user_id, gitId: decoded.git_id });
			next();
		}
		else {
			res.status(401).json({ error: 'unauthorized' });
		}
	} catch (err) {
		// console.log(err);
		res.status(401).json({ error: 'token expired' });
	}
}

async function ChangePw(req, res) {
	try {
		const type = req.body.type;
		// type : 0 
			// 로그인전에 비밀번호 찾기 용
			// 비밀번호 초기화 
		// type : 1
			// 로그인 후 마이페이지에서 비밀번호 변경 용
			// 이전 비밀번호 확인 후, 맞으면 새 비밀번호로 변경 
		const new_pw = req.body.new_pw;
		const user_id = req.body.user_id;
		if (type == 0) { 
			const user = await User.findOne({ "user_id": user_id });
			console.log(user);
			if (user == undefined) {
				res.status(201).json({ result: 'user not exists' });
				return;
			}
		}
		else if (type == 1){
			const user_pw = req.body.user_pw;
			const user = await User.loginCheck(user_id, user_pw);
			if (user === false) {
				res.status(400).json({ error: 'wrong pw' });
				return;
			}
		}
		await User.changePw(user_id, new_pw);
		res.status(201).json({ result: "success" });
		
	} catch (err) {
		// console.log(err);
		res.status(401).json({ error: err.message });
	}
}

async function UserInfomation(req, res) {
	try {
		const user_id = req.params.user_id;
		const user = await User.findOneByUsername(user_id);

		res.status(200).json({ user_name: user.user_name, user_email: user.user_email, git_id: user.git_id });
	} catch (err) {
		console.log(err)
		res.status(401).json({ error: 'erreor' })
	}
}

async function Change(req, res) {
	try{
		const { user_id, name, git_id } = req.body;
		User.findOneAndUpdate({ "user_id": user_id }, {
			$set: {	
				user_name: name.replace(/ /g,""),
				git_id: git_id.replace(/ /g,"")
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				throw new Error('user 정보 변경 실패')
			}
			else {
				res.status(201).json({result: true})
			}
		})
	}catch(err){
		console.log(err)
		res.status(401).json({error: 'error'})
	}
}

module.exports = {
	createUser: CreateUser,
	deleteUser: DeleteUser,
	logIn: LogIn,
	logOut: LogOut,
	getChallengeList: GetChallengeList,
	verifyToken: VerifyToken,
	outChallenge: OutChallenge,
	checkIdDupl: CheckIdDupl,
	changePw: ChangePw,
	userInfomation: UserInfomation,
	change: Change
};


