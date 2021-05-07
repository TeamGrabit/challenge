const express = require('express');
const Challenge = require('../models/challengeModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

function CreateChallenge(req, res) {
	const { name, challenge_start, challenge_end, challenge_users, challenge_leader, commitCount } = req.body;

	Challenge.create(name, challenge_start, challenge_end, challenge_users, challenge_leader, commitCount)
		.then(res.send(req.body))
		.catch((err) => {
			console.error(err);
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

function GetChallengeList(req, res) {
	const userId = req.params.userId;
	res.send(challenge_list);


	// DB user부분 가져와야함.
}


function GetChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	const getInfo = (challenge) => {
		if (challenge) {
			db.collection("challenges").findOne({ _id: id })
				.then((result) => {
					console.log("challengeInfo 받음");
					console.log(id);
					res.send(result)
				})
				.catch((err) => {
					console.error(err);
				})
		} else {
			res.send('false');
			throw new Error('Not founded challenge');
		}
	}

	Challenge.findOneById(id)
		.then(getInfo)

}


function FixChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);
	const { name, challenge_start, challenge_end, challenge_user_num, challenge_leader } = req.body;

	const fix = (challenge) => {
		if (challenge) {
			if (name !== undefined) {
				db.collection("challenges").updateOne({ _id: id }, {
					$set: {
						name: name
					}
				})
					.then(() => {
						console.log("challenge 이름 수정");
						console.log(id);
					})
			}
			if (challenge_start !== undefined) {
				db.collection("challenges").updateOne({ _id: id }, {
					$set: {
						challenge_start: challenge_start
					}
				})
					.then(() => {
						console.log("challenge 시작날짜 수정");
						console.log(id);
					})
			}
			if (challenge_end !== undefined) {
				db.collection("challenges").updateOne({ _id: id }, {
					$set: {
						challenge_end: challenge_end
					}
				})
					.then(() => {
						console.log("challenge 마지막날짜 수정");
						console.log(id);
					})
			}
			if (challenge_leader !== undefined) {
				db.collection("challenges").updateOne({ _id: id }, {
					$set: {
						challenge_leader: challenge_leader
					}
				})
					.then(() => {
						console.log("challenge 리더 수정");
						console.log(id);
					})
			}
			res.send(req.body);
		} else {
			res.send('false');
			throw new Error('Not founded challenge');
		}
	}

	Challenge.findOneById(id)
		.then(fix)

}

function DeleteChallenge(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	const removeChallenge = (challenge) => {
		if (challenge) {
			db.collection("challenges").deleteOne({ _id: id })
				.then((res) => {
					console.log("challenge 삭제");
					console.log(id);
				}).then(res.send(challenge));
		} else {
			res.send('false');
			throw new Error('Not founded challenge');
		}
	}

	Challenge.findOneById(id)
		.then(removeChallenge)


}

function JoinChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	const join = (challenge) => {
		// challenge에 userId 추가.
		userArray = challenge.challenge_users;
		userCount = challenge.challenge_user_num + 1;
		userArray.push(userId);
		db.collection("challenges").updateOne({ _id: id }, {
			$set: {
				challenge_users: userArray,
				challenge_user_num: userCount
			}
		})
			.then(() => {
				console.log("challenge에 user 추가");
				console.log(id);
			})

		// userDB에 challengeId 추가.

		res.send(req.body);

	}


	Challenge.findOneById(id)
		.then(join)

}

module.exports = {
	whoIsKing: WhoIsKing,
	createChallenge: CreateChallenge,
	getChallengeList: GetChallengeList,
	getChallengeInfo: GetChallengeInfo,
	fixChallengeInfo: FixChallengeInfo,
	deleteChallenge: DeleteChallenge,
	joinChallenge: JoinChallenge
};