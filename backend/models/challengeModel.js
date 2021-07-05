const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const CommitSchema = new Schema({
	_id: {
		type: String,
	},
	count: {
		type: Number,
		default: 0
	},
	join_time: {
		type: Date,
		default: Date.now
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
	state: {
		type: Number,
		default: 0
	},
	private_key: {
		type: String,
		trim: true,
		required: true
	},
	commitCount: [CommitSchema]
}, {
	versionKey: false
});

Challenge.pre("save", function (next) {
	var challenge = this;
	if (challenge.isModified("private_key")) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err);
			bcrypt.hash(challenge.private_key, salt, (err, hash) => {
				if (err) return next(err)
				challenge.private_key = hash;
				next();
			})
		})
	}
})

Challenge.statics.create = function (userId, name, challenge_start, challenge_end, private_key) {
	const challenge = new this({
		name,
		challenge_start,
		challenge_end,
		challenge_leader: userId,
		private_key
	})

	const commitCount = challenge.commitCount.create({ _id: userId })
	challenge.commitCount = commitCount

	challenge.challenge_users.push(userId)
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

Challenge.statics.privateCheck = async function(ch_id, key){
	const challenge = await this.findOne({"_id":ch_id});

	bcrypt.compare(key, challenge.private_key, (err, res) => {
		if (err){
			return false;
		}
		if (res) return true;
		else return false
	})
}

module.exports = mongoose.model('challenges', Challenge);
