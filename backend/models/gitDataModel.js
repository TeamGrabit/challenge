const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gitData = new Schema({
	user_id:{ type: String, required: true, unique: true, trim: true, lowercase: true },
	git_id:{ type: String, required: true, trim: true },
	commit_data:{ type : Array, required: true },
});

gitData.statics.create = function(user_id, git_id, commit_data) {
	const user = new this({
		user_id: user_id,
		git_id: git_id,
		commit_data: commit_data
	})
	// return the Promise
	return user.save()
}

gitData.statics.findOneByUserId = function(user_id) {
	return this.findOne({
		  user_id
	}).exec()
  }

module.exports = mongoose.model('gitData',gitData);
