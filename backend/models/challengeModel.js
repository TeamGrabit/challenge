const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commitSchema = new Schema({
	_id: {
		type: String,
	},
	count: {
		type: Number,
		default: 0
	}
});

var Challenge = new Schema({
	name: {
		type: String,
		required: true
	},
	challenge_start: {
		type: Date,
		default: Date.now,
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
	commitCount: [commitSchema]
}, {
	versionKey: false
});


Challenge.statics.create = function (name, challenge_start, challenge_end, challenge_users, challenge_leader, commitCount) {
	const challenge = new this({
		name,
		challenge_start,
		challenge_end,
		challenge_users,
		challenge_leader,
		commitCount
	})

	console.log("challenge 생성");
	console.log(challenge._id);

	// return the Promise
	return challenge.save()
}


Challenge.statics.findOneById = function (id) {
	return this.findOne({
		_id: id
	}).exec()
}

module.exports = mongoose.model('challenges', Challenge);
