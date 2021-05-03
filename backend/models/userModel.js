const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;

var User = new Schema({
  User_id:String,
  User_name: {type:String, required: true},
  User_password: {type:String, required: true},
  email: String,
  git_account:{type:String, required: true},
  challenge_count:String,
  in_date:Date,
});



User.statics.create = function(User_name,User_password,email,git_account,challenge_count,in_date) {
  const challenge = new this({
      User_name,
      User_password,
      email,
      git_account,
      challenge_count,
      in_date
  })

  console.log('user만들어짐'+User_name);
  
  // return the Promise
  return challenge.save()
}


User.statics.findOneByUsername = function(name) {
  return this.findOne({
      name
  }).exec()
}

module.exports = mongoose.model('user',User);
