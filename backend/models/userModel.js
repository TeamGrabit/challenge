const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  user_id: String,
  user_pw: String
});

module.exports = mongoose.model('user',userSchema);
