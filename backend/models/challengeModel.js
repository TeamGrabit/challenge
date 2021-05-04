const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Challenge = new Schema({
	name: {
		type: String,
		required: true
	},
	challenge_id: {
		type: String,
		unique: true
	},
	challenge_start: {
		type: Date,
		default: Date.now,
	},
	challenge_end: {
		type: Date
	},
	challenge_user_num: {
		type: Array
	},
	challenge_leader: {
		type: String
	}
});


Challenge.statics.create = function (name, challenge_id) {
	const challenge = new this({
		name,
		challenge_id,
	})

	console.log("challenge 생성");
	
	// return the Promise
	return challenge.save()
}



Challenge.statics.findOneByUsername = function (name) {
	return this.findOne({
		name
	}).exec()
}



module.exports = mongoose.model('challenge', Challenge);
