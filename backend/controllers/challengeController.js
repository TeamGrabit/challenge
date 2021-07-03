const express = require('express');

const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const db = mongoose.connection;

function CreateChallenge(req, res) {
	const { userId, name, challenge_start, challenge_end, private_key } = req.body;

	Challenge.create(userId, name, challenge_start, challenge_end, private_key)
		.then((doc) => {
			console.log("challenge 생성");
			console.log(doc._id);
			res.send('true');
		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

}

function DelUserInchallege(req,res){
    const challengeId = req.params.challengeId;
    const userId = req.params.userId;

    const id = ObjectID(challengeId);

    Challenge.findOneById(id).then((ch)=>{
        const preUser=ch.challenge_users;
        console.log(preUser);
        preuser.splice(preUser.indexOf(userId),1);
        console.log(preUser);
    }, (err,doc) =>{
        if(err){
            console.log(err);
        }else{
            console.log("Update =>"+perUser);
        }
    })
}



async function WhoIsKing(req, res) {
	const challengeId= req.params.challengeId;
	const id = ObjectID(challengeId);
	let usercommit=[];
	
	await Challenge.findOneById(id).then(async (challenge)=> {
		
		var commit =challenge.commitCount;
		console.log(commit);

		commit.sort(function(a, b) { // 내림차순
			return a.count > b.count ? -1 : a.count < b.count ? 1 : 0;
			// 광희, 명수, 재석, 형돈
		});

		for(let i=0;i<3;i++){
			await User.findById(commit[i]._id).then((user)=> {
				
				usercommit.push(user);
				
			},(err,doc)=>{
				if(err){
					console.log(err);
				}else{
					console.log(doc);
				}
			});
		}
	}),(err,doc)=>{
		if(err){
			console.log(err);
		}else{
			
			return doc;
		}
	}

	res.send(usercommit);
	res.end;
}
async function WhoIsPoor(req, res) {
	const challengeId= req.params.challengeId;
	const id = ObjectID(challengeId);
	var Puser =[];

	await Challenge.findById(id).then(async (chcommit) => {
		commit=chcommit.commitCount;
		

		commit.sort(function(a, b) { // 내림차순
		return a.count < b.count ? -1 : a.count > b.count ? 1 : 0;
	})
	
	await User.findById(commit[0]._id).then((user) =>{
		Puser=user;

	}, (err,doc) => {
		if(err){
			console.log(err);
			res.send(err);
		}else{
			console.log(Puser);
		}
	})
	console.log(commit[0]);
	}, (err,doc) => {
		if(err){
			console.log(err);
		}else{
		
		}
	})
	
	res.send(Puser);
	res.end;
}


function GetChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	Challenge.findById(id)
	.then((doc) => {
		console.log("challengeInfo 받음");
		console.log(doc._id)
		res.send(doc)
	})
	.catch((err) => {
		console.log(err)
		res.send(err)
	})

}


function FixChallengeInfo(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);
	var { name, challenge_start, challenge_end, challenge_leader } = req.body;

	Challenge.findOneById(id).then((ch) => {
		var preChallenge = ch;
		if (name === undefined) {
			name = preChallenge.name;
		}
		if (challenge_start === undefined) {
			challenge_start = preChallenge.challenge_start;
		}
		if (challenge_end === undefined) {
			challenge_end = preChallenge.challenge_end;
		}
		if (challenge_leader === undefined) {
			challenge_leader = preChallenge.challenge_leader;
		}
	}).then(() => {
		Challenge.findByIdAndUpdate(id, {
			$set: {
				name: name,
				challenge_start: challenge_start,
				challenge_end: challenge_end,
				challenge_leader: challenge_leader
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				console.log(err)
				res.send('false')
			}
			else {
				console.log("challenge 수정")
				console.log(doc._id)
				res.send('true')
			}
		})
	})


  res.end("success");
}

function DeleteChallenge(req, res) {
	const challengeId = req.params.challengeId;
	const id = ObjectID(challengeId);

	Challenge.findByIdAndDelete(id, (err, doc) => {
		if (err) {
			console.log(err)
			res.send('false')
		}
		else {
			console.log("challenge 삭제")
			console.log(doc._id)
			res.send('true')
		}
	})



}

function JoinChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	var userArray
	var userCount
	var newCommitCount

	Challenge.findOneById(id)
		.then((challenge) => {
			userArray = challenge.challenge_users
			userCount = challenge.challenge_user_num + 1

			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i] === userId)
					throw new Error('이미 가입되어 있음')
			}

			userArray.push(userId)

			//commitCount 추가
			newCommitCount = challenge.commitCount
			const addCommitCount = challenge.commitCount.create({ _id: userId })

			newCommitCount.push(addCommitCount)

			join(userArray, userCount, newCommitCount)
		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const join = (userArray, userCount, newCommitCount) => Challenge.findByIdAndUpdate(id, {
		$set: {
			challenge_users: userArray,
			challenge_user_num: userCount,
			commitCount: newCommitCount
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			throw new Error('challenge DB에 user추가 오류')
		}
		else {
			console.log("challenge에 user 추가")
			console.log(doc._id)
			res.send('true')
		}
	})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

}

function OutChallenge(req, res) {
	const { userId, challengeId } = req.body;
	const id = ObjectID(challengeId);

	var userArray
	var userCount
	var newCommitCount

	Challenge.findOneById(id)
		.then((challenge) => {
			userArray = challenge.challenge_users
			userCount = challenge.challenge_user_num - 1

			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i] === userId) {
					userArray.pop(i)

					//commitCount 삭제
					challenge.commitCount.id(userId).remove();
					newCommitCount = challenge.commitCount
					return 1;
				}
			}
			return 0;

		})
		.then((state) => {
			if (state === 0)
				throw new Error('challenge DB에 해당 user 없음.')
			out(userArray, userCount, newCommitCount)

		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const out = (userArray, userCount, newCommitCount) => Challenge.findByIdAndUpdate(id, {
		$set: {
			challenge_users: userArray,
			challenge_user_num: userCount,
			commitCount: newCommitCount
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			console.log(err)
			res.send('false')
		}
		else {
			console.log("challenge에 user 삭제")
			console.log(doc._id)
			res.send('true')
		}
	})
}

function InviteUser(req, res) {

}

function ChangeKey(req, res) {
	const { userId, private_key } = req.body;
	const challengeId = req.params.challengeId;

	Challenge.findOneById(challengeId)
	.then((ch) => {
		if (userId === ch.challenge_leader){
			changePrivateKey();
		}else{
			throw new Error('leader가 아님.')
		}
	})
	.catch((err) => {
		console.error(err);
		res.send('false')
	})

	const changePrivateKey = () => {
		Challenge.findByIdAndUpdate(challengeId, {
			$set: {
				private_key: private_key
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				console.log(err)
				res.send('false')
			}
			else {
				console.log("private_key 변경")
				console.log(doc._id)
				res.send('true')
			}
		})
	}

	
}

module.exports = {
	whoIsKing: WhoIsKing,
	whoIsPoor:WhoIsPoor,
	createChallenge: CreateChallenge,
	getChallengeInfo: GetChallengeInfo,
	fixChallengeInfo: FixChallengeInfo,
	deleteChallenge: DeleteChallenge,
	joinChallenge: JoinChallenge,
	outChallenge: OutChallenge,
	inviteUser : InviteUser,
	changeKey: ChangeKey,
	delUserInChallenge:DelUserInchallege
};