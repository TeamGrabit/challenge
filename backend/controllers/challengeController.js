const express = require('express');

const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;
const { getCommitList } = require('./grassController')

const bcrypt = require('bcrypt');
const { checkPreferences } = require('joi');

async function CreateChallenge(req, res) {
	const { user_id, name, challenge_start, challenge_end, private_key } = req.body;

	try {
		Challenge.create(user_id, name, challenge_start, challenge_end, private_key)
			.then((doc) => {
				console.log("challenge 생성");
				console.log(doc._id);
				return doc._id
			})
			.catch((err) => {
				console.error(err);
				res.send('false');
			})
			.then(async (ch_id) => {
				_user = await User.findOneByUsername(user_id)
				var chArray;
				chArray = _user.ch_list
				_challenge = await Challenge.findById(ch_id)
				chArray.push(String(_challenge._id));
				add_user(chArray)
			})

		const add_user = (chArray) => User.findOneAndUpdate({ "user_id": user_id }, {
			$set: {
				ch_list: chArray,
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				throw new Error('user DB에 ch_list 추가 오류')
			}
			else {
				console.log("user에 challenge 추가")
				console.log(doc)
				res.send('true')
			}
		})
			.catch((err) => {
				console.error(err);
				res.send('false');
			})
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

async function WhoIsKing(req, res) {
	const challenge_id = req.params.challenge_id;

	const id = ObjectID(challenge_id);
	let usercommit = [];

	await Challenge.findOneById(id).then(async (challenge) => {

		var commit = challenge.commitCount;


		commit.sort(function (a, b) { // 내림차순
			return a.count > b.count ? -1 : a.count < b.count ? 1 : 0;

		});




		for (let i = 0; i < 3; i++) {
			if (commit[i] == null) {
				break;
			}
			await User.findOne({ user_id: commit[i].user_id }).then((user) => {

				usercommit.push(user);

			}, (err, doc) => {
				if (err) {
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		}
	}), (err, doc) => {
		if (err) {
			console.log(err);
		} else {

			return doc;


		}
	}

	res.send(usercommit);
	res.end;
}



async function WhoIsPoor(req, res) {
	const challenge_id = req.params.challenge_id;


	const id = ObjectID(challenge_id);
	var Puser = [];


	await Challenge.findById(id).then(async (chcommit) => {
		var commit = chcommit.commitCount;


		commit.sort(function (a, b) { // 내림차순
			return a.count < b.count ? -1 : a.count > b.count ? 1 : 0;
		})

		await User.findOne({ user_id: commit[0].user_id }).then((user) => {
			Puser = user;

		}, (err, doc) => {
			if (err) {
				console.log(err);
				res.send(err);
			} else {


			}
		})

	}, (err, doc) => {
		if (err) {
			console.log(err);
		} else {

		}
	})

	res.send(Puser);
	res.end;
}

async function GetChallengeInfo(req, res) {
	const challenge_id = req.params.challenge_id;
	const id = ObjectID(challenge_id);

	try {
		commitList = await Challenge.findById(id).then((ch) => { return ch.commitCount })
		const today = new Date()
		const _year = today.getFullYear()
		const _month = today.getMonth() + 1
		for (let i = 0; i < commitList.length; i++) {
			var _joinday = commitList[i].join_time
			var join_year = _joinday.getFullYear()
			var join_month = _joinday.getMonth() + 1
			var start = 0
			if (join_year === _year && join_month === _month) { start = _joinday.getDate() }	// 챌린지를 이번해에 가입했으면 start를 조정함.
			month_count = await getCommitList(commitList[i].user_id, challenge_id, _year, _month)
			cnt = 0
			for (let j = start - 1; j < month_count[2].length; j++) {
				if (month_count[2][j] == true) { cnt += 1 }
			}
			commitList[i].count = cnt
		}

		await Challenge.findByIdAndUpdate(id, {
			$set: {
				commitCount: commitList
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				console.log(err)
				res.send('false')
			}
			else {
				console.log("commitCount update!")
			}
		})

		Challenge.findById(id)
			.then((doc) => {
				console.log("challengeInfo 받음");
				console.log(doc._id)
				res.send(doc)
			})
			.catch((err) => {
				console.log(err)
				res.send(err)
			})
	} catch (err) {
		console.log(err)
		res.send(err)
	}

}


async function FixChallengeInfo(req, res) {
	const challenge_id = req.params.challenge_id;
	const id = ObjectID(challenge_id);
	var { name, challenge_start, challenge_end, challenge_leader, user_id, private_key } = req.body;

	try {
		Challenge.findOneById(id)
			.then((ch) => {
				if (user_id === ch.challenge_leader) {
					changeInfo();
				} else {
					throw new Error('leader가 아님.')
				}
			})
			.catch((err) => {
				console.error(err);
				res.send('false')
			})

		const changeInfo = () => Challenge.findOneById(id).then((ch) => {
			var preChallenge = ch;
			if (name === undefined) {
				name = preChallenge.name;
			}
			if (challenge_start === undefined) {
				challenge_start = preChallenge.challenge_start;
			}
			if (challenge_end === undefined) {
				challenge_end = preChallenge.challenge_end;
			}
			if (challenge_leader === undefined) {
				challenge_leader = preChallenge.challenge_leader;
			}
			if (private_key === undefined) {
				private_key = preChallenge.private_key;
			}
		}).then(() => {
			Challenge.findByIdAndUpdate(id, {
				$set: {
					name: name,
					challenge_start: challenge_start,
					challenge_end: challenge_end,
					challenge_leader: challenge_leader,
					private_key: private_key
				}
			}, { new: true, useFindAndModify: false }, (err, doc) => {
				if (err) {
					console.log(err)
					res.send('false')
				}
				else {
					console.log("challenge 수정")
					console.log(doc._id)
					res.send('true')
				}
			})
		})
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

async function DeleteChallenge(req, res) {
	const challenge_id = req.params.challenge_id;
	const id = ObjectID(challenge_id);

	try {
		userArray = await Challenge.findById(id).then((ch) => { return ch.challenge_users })
		for (let i = 0; i < userArray.length; i++) {
			list = await User.findOne({ user_id: userArray[i] }).then((user) => { return user.ch_list })
			await list.splice(list.indexOf(challenge_id), 1);
			User.findOneAndUpdate({ user_id: userArray[i] }, {
				$set: {
					ch_list: list
				}
			}, { new: true, useFindAndModify: false }, (err, doc) => {
				if (err) {
					console.log(err)
					res.send('false')
				}
				else {
					console.log("user의 challengeList 수정")
					console.log(userArray[i])
				}
			})
		}
		Challenge.findByIdAndDelete(id, (err, doc) => {
			if (err) {
				console.log(err)
				res.send('false')
			}
			else {
				console.log("challenge 삭제")
				console.log(doc._id)
				res.send('true')
			}
		})
	} catch (err) {
		console.log(err)
		res.send('false')
	}
}

async function JoinChallenge(req, res) {
	const { user_id, private_key } = req.body;
	const challenge_id = req.params.challenge_id;
	const id = ObjectID(challenge_id);

	try {
		const challenge = await Challenge.findById(id)
		const user = await User.findOneByUsername(user_id)
		if(challenge === null || user === null) throw "잘못된 요청입니다."
		if (challenge.private_key === private_key){
			let result = await join(challenge, user);
			if(result === false) throw "challenge와 user에 추가 오류"
		}
		else {
			throw "private_key different!"
		}
		res.status(201).json({result: true})
	} catch (err) {
		console.log(err)
		res.status(401).json({errror: err})
	}
}

async function join(challenge, user){
	try{
		if(challenge.challenge_users.indexOf(user.user_id)>=0 || user.ch_list.indexOf(String(challenge._id))>=0) throw "이미 가입된 유저입니다."
		
		// challenge에 user 추가
		var userArray = [...challenge.challenge_users]
		var userCount = challenge.challenge_user_num+1

		userArray.push(user.user_id);
		const addCommitCount = challenge.commitCount.create({user_id: user.user_id})
		const newCommitCount = [...challenge.commitCount, addCommitCount]

		let challengeResult = await Challenge.findByIdAndUpdate(challenge._id, {
			$set: {
				challenge_users: userArray,
				challenge_user_num: userCount,
				commitCount: newCommitCount
			}
		}, {new: true, useFindAndModify: false}, (err, doc) => {
			if(err) return false
		})
		if(challengeResult === false) throw "challenge에 user 추가 실패"

		// user에 challenge 추가
		var challengeArray = [...user.ch_list, String(challenge._id)]

		let userResult = await User.findOneAndUpdate({user_id: user.user_id}, {
			$set: {
				ch_list: challengeArray
			}
		}, {new:true, useFindAndModify:false}, (err, doc) => {
			if(err) return false
		})
		if(userResult === false) throw "user에 challenge 추가 실패"

		return true
	}catch(err) {
		console.log(err)
		return false
	}
}

function OutChallenge(req, res) {
	const { user_id, challenge_id } = req.body;
	const id = ObjectID(challenge_id);

	var userArray
	var userCount
	var newCommitCount

	Challenge.findOneById(id)
		.then((challenge) => {
			userArray = challenge.challenge_users
			userCount = challenge.challenge_user_num - 1

			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i] === user_id) {
					userArray.pop(i)

					//commitCount 삭제
					challenge.commitCount.id(user_id).remove();
					newCommitCount = challenge.commitCount
					return 1;
				}
			}
			return 0;

		})
		.then((state) => {
			if (state === 0)
				throw new Error('challenge DB에 해당 user 없음.')
			out(userArray, userCount, newCommitCount)

		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const out = (userArray, userCount, newCommitCount) => Challenge.findByIdAndUpdate(id, {
		$set: {
			challenge_users: userArray,
			challenge_user_num: userCount,
			commitCount: newCommitCount
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			console.log(err)
			res.send('false')
		}
		else {
			console.log("challenge에 user 삭제")
			console.log(doc._id)
			res.send('true')
		}
	})
}

async function GetAllChallenge(req, res) {
	try {
		Challenge.find()
			.then((docs) => {
				res.status(200).json({ challenges: docs });
			})
			.catch((err) => {
				throw Error(err)
			})
	} catch (err) {
		res.status(400).json({ result: false });
	}
}

module.exports = {
	whoIsKing: WhoIsKing,
	whoIsPoor: WhoIsPoor,
	createChallenge: CreateChallenge,
	getChallengeInfo: GetChallengeInfo,
	fixChallengeInfo: FixChallengeInfo,
	deleteChallenge: DeleteChallenge,
	joinChallenge: JoinChallenge,
	outChallenge: OutChallenge,
	getAllChallenge: GetAllChallenge,
	join: join
};