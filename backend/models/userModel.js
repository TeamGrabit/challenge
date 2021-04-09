const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
  User_name: String,
  User_password: String,
  email: String
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
