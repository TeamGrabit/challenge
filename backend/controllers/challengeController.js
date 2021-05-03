const express = require('express');
const Challenge = require('../models/challengeModel');

function CreateChallenge(req, res) {
	const { name, challenge_id } = req.body;
	let newChallenge = null;

	const create = (challenge) => {
		if (challenge) {
			throw new Error('challengename exists')
		} else {
			return Challenge.create(name, challenge_id);
		}
	}

	Challenge.findOneByUsername(name)
		.then(create)

}

function readChallengeInfo(req, res) {
	const Info = req.body;
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


module.exports = {
	whoIsKing: WhoIsKing,
	createChallenge: CreateChallenge
};