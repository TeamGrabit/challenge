const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
  User_id:String,
  User_name: String,
  User_password: String,
  email: String,
  git_account:String,
  ch_ing:Array,
  ch_end:Array,
  in_date:Date,
});

User.statics.create = function(User_name,User_password,email) {
  const challenge = new this({
      User_name,
      User_password,
      email
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
