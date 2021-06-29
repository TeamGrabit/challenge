const express = require('express');
const Approve = require('../models/approveModel');
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
	const { approve_id } = req.body;
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

function GetApprove(req, res) {
	const { ch_id } = req.body;

	Approve.find({ ch_id: ch_id }).sort({ _id: -1 })
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

module.exports = {
	createApprove: CreateApprove,
	deleteApprove: DeleteApprove,
	getApprove: GetApprove
};