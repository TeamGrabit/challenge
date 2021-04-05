const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var challengeSchema = new Schema({
  name: String,
  chaellenge_id: String,
  user_count: Int16Array
});

module.exports = mongoose.model('challenge',challengeSchema);
