const Alarm = require('../models/alarmModel');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

async function CreateAlarm(req, res) {
	try {
		const { user_id, message } = req.body;
		Alarm.create(user_id, message);
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function GetAlarms(req, res) {
	try {
		const { user_id } = req.query;

		alarms = await Alarm.find({ user_id: user_id });
		res.status(200).json({ result: alarms });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function DeleteAlarm(req, res) {
	try {
		const { alarm_id } = req.body;
		const id = ObjectID(alarm_id);

		Alarm.findByIdAndDelete(id, (err, doc) => {
			if (err) {
				throw err;
			} else {
				console.log("alarm 삭제");
				console.log(doc)
			}
		})
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function ReadAlarm(req, res) {	// alarm을 읽으면 read를 1로 변경. 알람 hover에서 후순위로 두거나 지움.
	try {
		const { alarm_id } = req.body;
		const id = ObjectID(alarm_id);

		Alarm.findByIdAndUpdate(id, {
			$set: {
				read: 1
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				throw err;
			} else {
				console.log(doc);
			}
		})
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

module.exports = {
	createAlarm: CreateAlarm,
	getAlarms: GetAlarms,
	deleteAlarm: DeleteAlarm,
	readAlarm: ReadAlarm
};