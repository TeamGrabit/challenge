const express = require('express');
const Approve = require('../models/approveModel');
const Challenge = require('../models/challengeModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

function CreateApprove(req, res) {
	const { ch_id, user_id, type, message } = req.body;

	Approve.create(ch_id, user_id, type, message)
		.then(res.send(req.body))
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

}

function DeleteApprove(req, res) {
	const approve_id = req.params.approveId;
	const id = ObjectID(approve_id);

	Approve.findByIdAndDelete(id, (err, doc) => {
		if (err) {
			console.log(err)
		}
		else {
			console.log("approve 삭제")
			console.log(doc)
			res.send(doc)
		}
	})

}

function GetApproveList(req, res) {
	const ch_id = req.params.ch_id;

	Approve.find({ $and: [{ ch_id: ch_id }, { state: false }] }).sort({ _id: -1 })
		.then((docs) => {
			console.log("approve 목록 받음")
			console.log(docs)
			res.send(docs)
		})
		.catch((err) => {
			console.log(err)
			res.send(err)
		})
}


async function ConfirmApprove(req, res) {

	const approve_id = req.params.approveId;
	const Id = ObjectID(approve_id)
	const { user_id, ch_id } = req.body;

	const ch = await Challenge.findById(ch_id)


	Approve.findOneById(Id).then((ap) => {
		userArray = ap.approve_user

		for (let i = 0; i < userArray.length; i++) {
			if (userArray[i] === user_id)
				throw new Error('이미 허용 눌렀음')
		}
		userArray.push(user_id)
		userCnt = ap.approve_cnt + 1;
		approveState = 0;

		_entireCnt = ch.challenge_user_num

		if (userCnt / _entireCnt >= 0.5) {
			approveState = 1;
		}


		_confirm(userArray, userCnt, approveState)

	})
		.catch((err) => {
			console.error(err);
			res.send('false')
		})

	const _confirm = (userArray, userCnt, approveState) => Approve.findByIdAndUpdate(Id, {
		$set: {
			approve_user: userArray,
			approve_cnt: userCnt,
			state: approveState
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			throw new Error('approve 승인 오류')
		}
		else {
			console.log("approve 승인")
			console.log(doc._id)
			res.send('true')
		}
	})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

}

function GetApproveInfo(req, res) {
	const approve_id = req.params.approveId;
	const id = ObjectID(approve_id);
	Approve.findOneById(id)

	.then((ap) => {
		console.log("approve 받음")
		console.log(ap)
		res.send(ap)
	})
	.catch((err) => {
		console.log(err)
		res.send(err)
	})
}

module.exports = {
	createApprove: CreateApprove,
	deleteApprove: DeleteApprove,
	getApproveList: GetApproveList,
	confirmApprove: ConfirmApprove,
	getApproveInfo: GetApproveInfo
};