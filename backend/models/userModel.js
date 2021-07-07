const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var User = new Schema({

	user_id:{type: String, required: true, unique: true, trim: true, lowercase: true,},
	user_pw: {type: String, required: true, trim: true},
	user_name: {type: String, required: true, trim: true},
	user_email: {type: String, required: true, trim: true},
	git_id:{type: String, required: true, trim: true},
	ch_list:{type : Array, required: true}, //challenge 스키마 배열로 변경해도 좋을듯 
	in_date:{type: Date, required: false},
	last_update:{type: Date, required: true}

});

User.pre("save", function(next) {
	var user = this;
	if (user.isModified("user_pw")) {
		bcrypt.genSalt(10, (err,salt) => {
			if (err) return next(err);
			bcrypt.hash(user.user_pw, salt, (err, hash)=> {
				if (err) return next(err);
				user.user_pw = hash;
				next();
			});
		});
	}
});

User.statics.create = function(user_id,user_pw,user_name,user_email,git_id,in_date,last_update) {
	const user = new this({
		user_id: user_id,
		user_pw: user_pw,
		user_name: user_name,
		user_email: user_email,
		ch_list: [],
		git_id: git_id,
		in_date: in_date,
		last_update: last_update
	})

  console.log('user만들어짐 :'+user_id);
  
  // return the Promise
  return user.save()
}


User.statics.findOneByUsername = function(user_id) {
  return this.findOne({
		user_id
  }).exec()
}

User.statics.getUserById = async function(id) {
	const result = await this.findOne({"user_id": id});
	return result;
}

User.statics.loginCheck = async function(id,pw) {
	const user = await this.findOne({"user_id": id});
	console.log("user :"+user);
	
	if (bcrypt.compare(pw, user.user_pw)){
		return user;
	}

	// return this.findOne({"user_id": id, "user_pw": pw});
}
module.exports = mongoose.model('user',User);
