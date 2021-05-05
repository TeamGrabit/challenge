const express = require('express');
const Challenge = require('../models/challengeModel');
const mongoose = require('mongoose');
const db = mongoose.connection;

function CreateChallenge(req, res) {
	const { name, challenge_id, challenge_user_num, challenge_leader } = req.body;
	let newChallenge = null;

	const create = (challenge) => {
		if (challenge) {
			throw new Error('challengename exists')
		} else {
			return Challenge.create(name, challenge_id, challenge_user_num, challenge_leader);
		}
	}

	Challenge.findOneById(challenge_id)
		.then(create)

	res.send(req.body);
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

	var challenge_list = [1, 2];
	res.send(challenge_list);


	// DB user부분 가져와야함.
}


function GetChallengeInfo(req, res){
	const challengeId = req.params.challengeId;
	var challengeInfo;

	const getInfo = (challenge) => {
		if(challenge){
			db.collection("challenges").find({challenge_id: challengeId}).toArray(function(err,result){
				if(err){
					throw err;
				}
				
				challengeInfo = result;
				console.log(challengeInfo)
				res.send(challengeInfo)
			} )
		}else{
			return new Error('Not found challenge')
		}
	}

	Challenge.findOneById(challengeId)
		.then(getInfo)

}


function FixChallengeInfo(req, res){
	const challengeId = req.params.challengeId;
	const { name, challenge_user_num, challenge_leader } = req.body;
	var challengeInfo;

	const fix = (challenge) => {
		if(challenge){
			db.collection("challenges").updateOne({challenge_id: challengeId}, {
				$set: {
					name: name,
					if(challenge_user_num){
						challenge_user_num: challenge_user_num
					},
					if(challenge_leader){
						challenge_leader: challenge_leader
					}
				}
			})
			.then((res) => {
				console.log(req.body);
			}).then(res.send(req.body));
		}else{
			return new Error('Not found challenge').then(res.send("false"));
		}
	}

	Challenge.findOneById(challengeId)
		.then(fix)

}

function DeleteChallenge(req, res){
	const challengeId = req.params.challengeId;
	var challengeInfo;

	const removeChallenge = (challenge) => {
		if(challenge){
			db.collection("challenges").deleteOne({challenge_id: challengeId})
			.then((res) => {
				console.log(req.body)
			}).then(res.send(req.body));
		}else{
			return new Error('Not found challenge').then(res.send("false"));
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