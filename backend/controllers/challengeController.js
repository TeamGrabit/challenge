const express = require('express');
const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

function CreateChallenge(req, res) {
	const { userId, name, challenge_start, challenge_end } = req.body;

	Challenge.create(userId, name, challenge_start, challenge_end)
		.then((doc) => {
			console.log("challenge 생성");
			console.log(doc._id);
			res.send('true');
		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

}

function WhoIsKing(req, res) {
	var _id = req.params.id;

	Challenge.findById(_id, function (err, docs) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("Result : ", docs);
		}
	})

}


function GetChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	Challenge.findById(id, (err, doc) => {
		if (err) {
			console.log(err)
		}
		else {
			console.log("challengeInfo 받음");
			console.log(doc._id)
			res.send(doc)
		}
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

function JoinChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	var userArray
	var userCount
	var newCommitCount

	Challenge.findOneById(id)
		.then((challenge) => {
			userArray = challenge.challenge_users
			userCount = challenge.challenge_user_num + 1

			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i] === userId)
					throw new Error('이미 가입되어 있음')
			}

			userArray.push(userId)

			//commitCount 추가
			newCommitCount = challenge.commitCount
			const addCommitCount = challenge.commitCount.create({ _id: userId })

			newCommitCount.push(addCommitCount)

			join(userArray, userCount, newCommitCount)
		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const join = (userArray, userCount, newCommitCount) => Challenge.findByIdAndUpdate(id, {
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
			res.send('true')
		}
	})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

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

module.exports = {
	whoIsKing: WhoIsKing,
	createChallenge: CreateChallenge,
	getChallengeInfo: GetChallengeInfo,
	fixChallengeInfo: FixChallengeInfo,
	deleteChallenge: DeleteChallenge,
	joinChallenge: JoinChallenge,
	outChallenge: OutChallenge
};