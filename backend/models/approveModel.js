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


module.exports = mongoose.model('approves', Approve);
