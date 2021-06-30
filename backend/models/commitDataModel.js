const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commitData = new Schema({
	user_id:{ type: String, required: true, unique: true, trim: true, lowercase: true },
	git_id:{ type: String, required: true, trim: true },
	commit_data:{ type : Array, required: true },
});

commitData.statics.create = function(user_id, git_id, commit_data) {
	const user = new this({
		user_id: user_id,
		git_id: git_id,
		commit_data: commit_data
	})
	console.log(commit_data);
	// return the Promise
	return user.save()
}

module.exports = mongoose.model('commitData',commitData);
