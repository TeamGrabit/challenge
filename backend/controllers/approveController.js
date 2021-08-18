const Approve = require('../models/approveModel');
const Challenge = require('../models/challengeModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');

async function CreateApprove(req, res) {
	try {
		const { ch_id, user_id, type, message, request_date } = req.body;
		const _id = ObjectID(ch_id);
		const date = request_date.split("-")
		const equal_month = date[0] + "-" + date[1]
		if (message.length > 100) {
			throw "message를 100자 이내로 작성바랍니다."
		}
		if (type == 0) {						// pass 요청
			const vacation_cnt = await Challenge.findById(_id).then((doc) => { return doc.vacation_count })
			const pass_cnt = await Approve.find({ $and: [{ request_date: { $regex: equal_month } }, { type: 0 }] }).then((docs) => { return docs.length })
			if (pass_cnt < vacation_cnt) {
				Approve.create(ch_id, user_id, type, message, request_date, true)
				res.status(201).json({ result: true })
			}else{
				res.status(401).json({result: false})
			}
		} else {								// 승인 or 휴가 요청
			Approve.create(ch_id, user_id, type, message, request_date, false)
			res.status(201).json({ result: true })
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err })
	}
}

function DeleteApprove(req, res) {
	const approve_id = req.params.approve_id;
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

async function GetApproveList(req, res) {
	try {
		const { user_id } = req.query;
		const ch_id = req.params.ch_id;

		approves = await Approve.find({
			$and: [{ ch_id: ch_id }, { state: false },
			{ user_id: { $ne: user_id } }, { approve_user: { $nin: user_id } }]
		}).sort({ _id: -1 })

		res.status(200).json({ result: approves })
	} catch (err) {
		console.log(err)
		res.status(401).json({ error: 'erreor' })
	}
}

async function GetAllApproveList(req, res) {
	try {
		const ch_id = req.params.ch_id;

		approves = await Approve.find({
			$and: [{ ch_id: ch_id }, { state: false }]
		}).sort({ _id: -1 })

		res.status(200).json({ result: approves })
	} catch (err) {
		console.log(err)
		res.status(401).json({ error: 'erreor' })
	}
}


async function ConfirmApprove(req, res) {		// approve 승인 누르면 count 증가시키는 api

	const approve_id = req.params.approve_id;
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
	const approve_id = req.params.approve_id;
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
	getApproveInfo: GetApproveInfo,
	getAllApproveList: GetAllApproveList
};