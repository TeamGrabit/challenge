const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthMail = new Schema({
    email: {
      type: String,
      required: true, 
      trim: true,
    },
    auth_num: {
        type: String,
        required: true, 
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

AuthMail.statics.create = function(email, auth_num) {
    const authMail = new this({
        email: email,
        auth_num: auth_num,
    });
    console.log("mail data 생성");
    // return the Promise
    return authMail.save()
}

AuthMail.statics.findRecentByEmail = async function(email) { 
    // 해당 email에 대한 모든 데이터 찾아서 내림차순 정렬 
    const result = await this.find({"email": email}).sort({"date":-1});
    // console.log(result[0]);
    return result[0]; //가장 최신값
}

module.exports = mongoose.model('authMail',AuthMail);