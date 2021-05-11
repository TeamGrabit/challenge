const express = require('express');
const Challenge = require('../models/challengeModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

function CreateChallenge(req, res) {
	const { name, challenge_start, challenge_end, challenge_user_num, challenge_leader, commitCount } = req.body;

	Challenge.create(name, challenge_start, challenge_end, challenge_user_num, challenge_leader, commitCount)
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

function GetChallengeList(req, res){
	const userId = req.params.userId;
	res.send(challenge_list);


	// DB user부분 가져와야함.
}


function GetChallengeInfo(req, res){
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	const getInfo = (challenge) => {
		if(challenge){
			db.collection("challenges").findOne({_id: id})
			.then((result) => {
				console.log("challengeInfo 받음");
				res.send(result)
			})
			.catch((err) => {
				console.error(err);
			})
		}else{
			res.send('false');
			throw new Error('Not founded challenge');
		}
	}

	Challenge.findOneById(challengeId)
		.then(getInfo)

}


function FixChallengeInfo(req, res){	// 수정필요
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);
	const { name, challenge_user_num, challenge_leader } = req.body;

	const fix = (challenge) => {
		if(challenge){
			if(name!==null){
				console.log(name);
				db.collection("challenges").updateOne({_id: id}, {
					$set: {
						name: name
					}
				})
				.then(() => {
					console.log("challenge 이름 수정");
				})
				.then(res.send(req.body));
			}else if(challenge_user_num!==null){
				db.collection("challenges").updateOne({_id: id}, {
					$set: {
						challenge_user_num: challenge_user_num
					}
				})
				.then(() => {
					console.log("challenge 유저 수정");
				})
				.then(res.send(req.body));
			}else if(challenge_leader!==null){
				db.collection("challenges").updateOne({_id: id}, {
					$set: {
						challenge_leader: challenge_leader
					}
				})
				.then(() => {
					console.log("challenge 리더 수정");
				})
				.then(res.send(req.body));
			}
		}else{
			res.send('false');
			throw new Error('Not founded challenge');
		}
	}

	Challenge.findOneById(challengeId)
		.then(fix)

}

function DeleteChallenge(req, res){
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	const removeChallenge = (challenge) => {
		if(challenge){
			db.collection("challenges").deleteOne({_id: id})
			.then((res) => {
				console.log("challenge 삭제");
			}).then(res.send(challenge));
		}else{
			res.send('false');
			throw new Error('Not founded challenge');
		}
	}

	Challenge.findOneById(challengeId)
		.then(removeChallenge)


}

module.exports = {
	whoIsKing: WhoIsKing,
	createChallenge: CreateChallenge,
	getChallengeList: GetChallengeList,
	getChallengeInfo: GetChallengeInfo,
	fixChallengeInfo: FixChallengeInfo,
	deleteChallenge: DeleteChallenge
};