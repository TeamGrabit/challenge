const express = require('express');

const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

async function CreateChallenge(req, res) {
	const { userId, name, challenge_start, challenge_end, private_key } = req.body;

	Challenge.create(userId, name, challenge_start, challenge_end, private_key)
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
			_user = await User.findOneByUsername(userId)
			var chArray;
			chArray = _user.ch_list
			_challenge = await Challenge.findById(ch_id)
			chArray.push(_challenge._id);
			join(chArray)
		})

	const join = (chArray) => User.findOneAndUpdate({ "user_id": userId }, {
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
}

function WhoIsKing(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);


	Challenge.findById(id).then((chcommit) => {
		var commit = chcommit.commitCount;
		commit.sort(1);
	}, (err, doc) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Challengekig :" + commit[1]);
			res.send(commit[1]);
		}
	})
}
function WhoIsPoor(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);


	Challenge.findById(id).then((chcommit) => {
		var commit = chcommit.commitCount;
		commit.sort(-1);
	}, (err, doc) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Challengekig :" + commit[1]);
			res.send(commit[1]);
		}
	})
}


function GetChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

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

}


function FixChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);
	var { name, challenge_start, challenge_end, challenge_leader } = req.body;

	Challenge.findOneById(id).then((ch) => {
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
	}).then(() => {
		Challenge.findByIdAndUpdate(id, {
			$set: {
				name: name,
				challenge_start: challenge_start,
				challenge_end: challenge_end,
				challenge_leader: challenge_leader
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


	res.end("success");
}

function DeleteChallenge(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

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



}

async function JoinChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	var userArray
	var userCount
	var newCommitCount

	const join_ch = (userArray, userCount, newCommitCount) => Challenge.findByIdAndUpdate(id, {
		$set: {
			challenge_users: userArray,
			challenge_user_num: userCount,
			commitCount: newCommitCount
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			throw new Error('challenge DB에 user추가 오류')
		}
		else {
			console.log("challenge에 user 추가")
			console.log(doc._id)
		}
	})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const join_user = (chArray) => User.findOneAndUpdate({ "user_id": userId }, {
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

	challenge = await Challenge.findOneById(id)
	if (challenge === null) {
		res.send('false')
		throw new Error('not exist challenge');
	}

	userArray = challenge.challenge_users
	userCount = challenge.challenge_user_num + 1

	for (let i = 0; i < userArray.length; i++) {
		if (userArray[i] === userId) {
			res.send('false')
			throw new Error('이미 가입되어 있음')
		}
	}
	userArray.push(userId)

	//commitCount 추가
	newCommitCount = challenge.commitCount
	const addCommitCount = challenge.commitCount.create({ _id: userId })
	newCommitCount.push(addCommitCount)

	join_ch(userArray, userCount, newCommitCount)

	user = await User.findOneByUsername(userId)
	if (user === null) {
		res.send('false')
		throw new Error('user가 존재하지 않음.');
	}
	var chArray;
	chArray = user.ch_list
	if (chArray.indexOf(challengeId) >= 0) {	// 이미 해당 Id의 challenge에 가입되어 있는지 확인.
		res.send('false')
		throw new Error('already join');
	}
	chArray.push(challengeId);
	
	join_user(chArray)



}

function OutChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	var userArray
	var userCount
	var newCommitCount

	Challenge.findOneById(id)
		.then((challenge) => {
			userArray = challenge.challenge_users
			userCount = challenge.challenge_user_num - 1

			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i] === userId) {
					userArray.pop(i)

					//commitCount 삭제
					challenge.commitCount.id(userId).remove();
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

function InviteUser(req, res) {

}

function ChangeKey(req, res) {
	const { userId, private_key } = req.body;
	const challengeId = req.params.challengeId;

	Challenge.findOneById(challengeId)
	.then((ch) => {
		if (userId === ch.challenge_leader){
			changePrivateKey();
		}else{
			throw new Error('leader가 아님.')
		}
	})
	.catch((err) => {
		console.error(err);
		res.send('false')
	})

	const changePrivateKey = () => {
		Challenge.findByIdAndUpdate(challengeId, {
			$set: {
				private_key: private_key
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				console.log(err)
				res.send('false')
			}
			else {
				console.log("private_key 변경")
				console.log(doc._id)
				res.send('true')
			}
		})
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
	inviteUser: InviteUser,
	changeKey: ChangeKey
};