const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var User = new Schema({
//   User_id:String,
//   User_name: String,
//   User_password: String,
//   email: String,
//   git_account:String,
//   challenge_count:String,
//   in_date:Date,
// });

var User = new Schema({
	user_id:{type: String, required: true, unique: true, trim: true, lowercase: true,},
	user_pw: {type: String, required: true, trim: true},
	user_name: {type: String, required: true, trim: true},
	user_email: {type: String, required: true, trim: true},
	git_id:{type: String, required: true, trim: true},
	ch_ing:{type: Array, required: false},
	ch_end:{type: Array, required: false},
	in_date:{type: Date, required: false},
	last_update:{type: Date, required: true}
});

User.statics.create = function(user_id,user_pw,user_name,user_email,git_id,ch_ing,ch_end,in_date,last_update) {
	const challenge = new this({
		user_id,
		user_pw,
		email,
		user_name,
		user_email,
		git_id,
		ch_ing,
		ch_end,
		in_date,
		last_update
	})

  console.log('user만들어짐 :'+user_id);
  
  // return the Promise
  return challenge.save()
}


User.statics.findOneByUsername = function(user_id) {
  return this.findOne({
		user_id
  }).exec()
}

module.exports = mongoose.model('user',User);
