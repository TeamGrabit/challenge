const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Challenge = new Schema({
  name: String,
  challenge_id: String,
  challeng_start: Date,
  challenge_end:Date,
  challenge_user_num: Array,
  challenge_leader:String,
});


Challenge.statics.create = function(name, challenge_id){
  const challenge = new this({
      name,
      challenge_id,
  })
  // return the Promise
  return challenge.save()
}



Challenge.statics.findOneByUsername = function(name) {
  return this.findOne({
      name
  }).exec()
}



module.exports = mongoose.model('challenge',Challenge);
