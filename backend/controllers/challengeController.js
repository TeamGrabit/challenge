const express = require('express');
const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

function CreateChallenge(req, res) {
	const { name, challenge_start, challenge_end, challenge_users, challenge_leader, commitCount } = req.body;

	Challenge.create(name, challenge_start, challenge_end, challenge_users, challenge_leader, commitCount)
		.then((doc) => {
			console.log("challenge 생성");
			console.log(doc);
			res.send(req.body);
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
			console.log(doc)
			res.send(doc)
		}
	})

}


function FixChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);
	var { name, challenge_start, challenge_end, challenge_user_num, challenge_leader } = req.body;

	Challenge.findOneById(id).then((ch) => {
		var preChallenge = ch;
		if(name===undefined){
			name = preChallenge.name;
		}
		if(challenge_start===undefined){
			challenge_start = preChallenge.challenge_start;
		}
		if(challenge_end===undefined){
			challenge_end = preChallenge.challenge_end;
		}
		if(challenge_user_num===undefined){
			challenge_user_num = preChallenge.challenge_user_num;
		}
		if(challenge_leader===undefined){
			challenge_leader = preChallenge.challenge_leader;
		}
	}).then(() => {
		Challenge.findByIdAndUpdate(id, {
			$set: {
				name: name,
				challenge_start: challenge_start,
				challenge_end: challenge_end,
				challenge_user_num: challenge_user_num,
				challenge_leader: challenge_leader
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				console.log(err)
			}
			else {
				console.log("challenge 수정")
				console.log(doc)
				res.send(doc)
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
		}
		else {
			console.log("challenge 삭제")
			console.log(doc)
			res.send(doc)
		}
	})


}

function JoinChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	var userArray
	var userCount

	Challenge.findOneById(id)
		.then((challenge) => {
			userArray = challenge.challenge_users
			userCount = challenge.challenge_user_num + 1
			userArray.push(userId)

			//commitCount 추가해줘야 함.

			join(userArray, userCount)
		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const join = (userArray, userCount) => Challenge.findByIdAndUpdate(id, {
		$set: {
			challenge_users: userArray,
			challenge_user_num: userCount
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			console.log(err)
		}
		else {
			console.log("challenge에 user 추가")
			console.log(doc)
			res.send(doc)
		}
	})

}

module.exports = {
	whoIsKing: WhoIsKing,
	createChallenge: CreateChallenge,
	getChallengeInfo: GetChallengeInfo,
	fixChallengeInfo: FixChallengeInfo,
	deleteChallenge: DeleteChallenge,
	joinChallenge: JoinChallenge
};