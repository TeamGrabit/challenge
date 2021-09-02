const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Invite = new Schema({
	invite_email: {
		type: String,
		required: true,
		trim: true
	},
	challenge_id: {
		type: String,
		require: true
	},
	send_user: {
		type: String,
		require: true
	},
	auth_num: {
        type: String,
        required: true, 
    },
}, {
	versionKey: false
});

Invite.statics.create = function (invite_email, challenge_id, send_user, auth_num) {
	const invite = new this({
		invite_email,
		challenge_id,
		send_user,
		auth_num
	})

	console.log('invite API 생성')
	// return the Promise
	return invite.save()
}

module.exports = mongoose.model('invites', Invite);
