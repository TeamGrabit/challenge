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
        type: String
    },
    date:{
        type: Date,
        default: Date.now
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

Approve.statics.create = function (ch_id, user_id, type, message) {
	const approve = new this({
		ch_id,
        user_id,
        type,
        message
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
    // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const today = new Date();
    // console.log(new Date(today + (KR_TIME_DIFF)));
    const start = new Date(year, month-1);
    const end = new Date(year, month);
    const result = await this.find({"user_id": user_id, "ch_id": ch_id, "type": 0, "state": true,
                            "date": {"$gte": start, "$lte": end} //두 날짜 사이에 있는 값 가져옴     
                        });

    console.log(result);
}
module.exports = mongoose.model('approves', Approve);
