const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Approve = new Schema({
	ch_id: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
        require: true
	},
	type: {
        type: Number,
        default: 0
    },
    message:{
        type: String,
		maxlength: 100
    },
    date:{
        type: Date,
        default: new Date()
    },
	request_date:{
		type: String
	},
    approve_user:{
        type: Array,
    },
    approve_cnt:{
        type: Number,
        default: 0
    }, 
    state:{ 
        type: Boolean,
        default: false
    }
}, {
	versionKey: false
});

Approve.statics.create = function (ch_id, user_id, type, message, request_date) {
	const approve = new this({
		ch_id,
        user_id,
        type,
        message,
		request_date
	})

	console.log("modal 생성");
	console.log(approve._id);

	// return the Promise
	return approve.save()
}

Approve.statics.findOneById = function (id) {
	return this.findOne({
		_id: id
	}).exec()
}

Approve.statics.findByUserChallangeMonth =async function(user_id, ch_id, year, month) {
    // user_id, ch_id 에 해당하는 정보 중에서, 
    // year, month를 기준으로 3달치 정보 return 
    // ex ) 2021, 7 이라고 하면 2021-05-01 ~ 2021-07-31 까지 
    const start = new Date(year, month-3);
    // console.log(start);
    const end = new Date(year, month); // TODO : 다음 월 1일에 대한 데이터가 포함되지 않는지 확인 필요
    // console.log(end);
    const result = await this.find({"user_id": user_id, "ch_id": ch_id, "type": 0, "state": true,
                            "date": {"$gte": start, "$lte": end} //두 날짜 사이에 있는 값 가져옴     
                        });

    return result;
}
module.exports = mongoose.model('approves', Approve);
