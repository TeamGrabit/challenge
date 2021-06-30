const CommitData = require('../models/commitDataModel');
const User = require('../models/userModel');
const { crawlingModule } = require('./crawling');

async function CreateInitData(req, res, next) {
    try {
        const { user_id } = req.body;

        const user = await User.findOneByUsername(user_id);
        if (user) {
			let commit_data = crawlingModule(user.git_id);
			await CommitData.create(user_id, user.git_id, commit_data);
        } else {
			throw 'user not exists';
        }
        res.end("result");
    } catch (err) {
        res.status(401).json({ error: err });
        next(err);
    }
}

module.exports = {
    createInitData: CreateInitData,
};