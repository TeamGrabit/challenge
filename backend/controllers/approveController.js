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
	const id = ObjectID(approveId);

	const removeApprove = (approve) => {
		if (approve) {
			db.collection("approves").deleteOne({ _id: id })
				.then((res) => {
					console.log("approve 삭제");
					console.log(id);
				}).then(res.send(approve));
		} else {
			res.send('false');
			throw new Error('Not founded approve');
		}
	}

	Approve.findOneById(id)
		.then(removeApprove)

}

function GetApprove(req, res) {
	const { ch_id } = req.body;

	db.collection("approves").find({ch_id: ch_id}).sort({user_id: -1}).toArray(function(err,result){
        if(err){
            throw err;
        }
        
        console.log(result);
		res.send(result);
    } )
}

module.exports = {
	createApprove: CreateApprove,
	deleteApprove: DeleteApprove,
	getApprove: GetApprove
};