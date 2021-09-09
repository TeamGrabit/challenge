const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');


const CommitSchema = new Schema({
	user_id: {
		type: String,
	},
	count: {
		type: Number,
		default: 0
	},
	join_time: {
		type: Date,
		default: new Date()
	},
	user_id:{
		type:String
	}
});

var Challenge = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	challenge_start: {
		type: Date,
		default: new Date(),
	},
	challenge_end: {
		type: Date
	},
	challenge_users: {
		type: Array
	},
	challenge_user_num: {
		type: Number,
		default: 1
	},
	challenge_leader: {
		type: String,
		required: true
	},
	state: {
		type: Number,
		default: 0
	},
	private_key: {
		type: String,
		trim: true
	},
	pass_count: {
		type: Number,
		default: 0
	},
	commitCount: [CommitSchema]
}, {
	versionKey: false
});

Challenge.statics.create = function (userId, name, challenge_start, challenge_end, private_key, pass_count) {
	const challenge = new this({
		name,
		challenge_start,
		challenge_end,
		challenge_leader: user_id,
		private_key,
		pass_count
	})

	const commitCount = challenge.commitCount.create({ user_id: user_id })

	challenge.commitCount = commitCount

	challenge.challenge_users.push(user_id)
	//commitCount 추가.

	console.log(challenge);

	// return the Promise
	return challenge.save()
}

Challenge.statics.findOneById = function (id) {
	return this.findOne({
		_id: id
	}).exec()
}

module.exports = mongoose.model('challenges', Challenge);
