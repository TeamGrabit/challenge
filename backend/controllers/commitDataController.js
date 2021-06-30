const CommitData = require('../models/commitDataModel');
const User = require('../models/userModel');
const { crawlingModule } = require('./crawling');

async function CreateInitData(req, res, next) {
    try {
        const { user_id, from, to } = req.body;

        const user = await User.findOneByUsername(user_id);
        if (user) {
			// 이미 생성된 grass가 있는지?
			const grass = await CommitData.findOneByUsername(user_id)
			if(grass) throw 'grass already exists'

			// 깃 크롤링
			const commit_data = await crawlingModule(user.git_id, from, to);
			await CommitData.create(user_id, user.git_id, commit_data);
        } else {
			throw 'user not exists';
        }
        res.end("success");
    } catch (err) {
        res.status(401).json({ error: err });
        next(err);
    }
}

async function GetData(req, res, next) {
    try {
        const { user_id } = req.body;

		const grass = await CommitData.findOneByUsername(user_id)
        if (grass) {
			res.status(200).json(grass);
        } else {
			throw 'grass not exists';
        }
        res.end("success");
    } catch (err) {
        res.status(401).json({ error: err });
        next(err);
    }
}

module.exports = {
    createInitData: CreateInitData,
	getData: GetData,
};