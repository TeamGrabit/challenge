const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Challenge = require('../models/challengeModel');
const { ObjectID } = require('bson');


require("dotenv").config();
const SecretKey = process.env.SECRET_KEY;
const salt = process.env.SALT;

function getCurrentDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var today = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var milliseconds = date.getMilliseconds();
	return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

async function CreateUser(req, res, next) {

    try {
        console.log(req.body);
        const { user_id, user_pw, user_name, user_email, git_id } = req.body;

        let today = getCurrentDate();
        const in_date = today;
        const last_update = today;

        const user = await User.findOneByUsername(user_id);
        if (user) {
            console.log(user);
            throw 'user exists';
        } else {
            await User.create(user_id, user_pw, user_name, user_email, git_id, in_date, last_update);
        }
        res.end("result");
    } catch (err) {
        res.status(401).json({ error: err});
        next(err);
    }
}    
function DeleteUser(req, res) {
	var id = req.params.id;

	User.findByIdAndDelete(_id, function (err, docs) {
		if (err) {
			console.log(err)
		}
		else {
			console.log("Deleted : ", docs);
		}
	});
	res.end('Delete')

}

function GetChallengeList(req, res) {		// userId를 기반으로 user의 ch_list반환.
	const userId = req.params.userId;

	var challengeList = [];

	const addChallenge = (ch_id) => {
		const challengeId = ObjectID(ch_id)
		return new Promise((resolve) => {
			Challenge.findById(challengeId)
			.then((Info) => resolve(Info));
		})
	  }

	const getList = async (list) => {
		const promises = list.map(async ch_id => {
		  return await addChallenge(ch_id)
			.then(Info => Info)
		})
		
		const results = await Promise.all(promises)
		results.forEach(Info => {
			var infoList = {
				name: Info.name,
				state: Info.state,
				challenge_id: Info._id
			}
			challengeList.push(infoList)
		})
		return challengeList
	  }

	User.findOneByUsername(userId)
		.then((user) => {
			if (user) {
				list = user.ch_list;
				return list
			} else {
				throw new Error('not exist user')
			}
		})
		.then((list) => getList(list))
		.then((challengeList) => {
			console.log(challengeList)
			res.send(challengeList)
		})

}

function JoinChallenge(req, res) {		// user의 ch_list부분에 새로운 challengeId 추가.
	const { userId, challengeId } = req.body;
	const ch_id = ObjectID(challengeId)

	User.findOneByUsername(userId)
		.then((user) => {
			if (user === null) {
				throw new Error('user가 존재하지 않음.');
			} else {
				return user;
			}
		})
		.then((user) => {
			var chArray;
			Challenge.findById(ch_id)		// 해당 Id의 챌린지가 없다면 error 반환.
				.then((challenge) => {
					if (challenge === null) {
						throw new Error('not exist challenge');
					}
				})
				.then(() => {
					chArray = user.ch_list
					if (chArray.indexOf(challengeId) >= 0) {	// 이미 해당 Id의 challenge에 가입되어 있는지 확인.
						throw new Error('already join');
					}
					chArray.push(challengeId);
					join(chArray)
				})
		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const join = (chArray) => User.findOneAndUpdate({ "user_id": userId }, {
		$set: {
			ch_list: chArray,
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			throw new Error('user DB에 ch_list 추가 오류')
		}
		else {
			console.log("user에 challenge 추가")
			console.log(doc)
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

	var chArray

	User.findOneByUsername(userId)
		.then((user) => {
			chArray = user.ch_list

			for (let i = 0; i < chArray.length; i++) {
				if (chArray[i] === challengeId) {
					chArray.pop(i);
					return 1;
				}
			}
			return 0;
		})
		.then((state) => {
			if (state === 0)
				throw new Error('user DB에 해당 challenge 없음.')
			out(chArray)

		})
		.catch((err) => {
			console.error(err);
			res.send('false');
		})

	const out = (chArray) => User.findOneAndUpdate({ user_id: userId }, {
		$set: {
			ch_list: chArray
		}
	}, { new: true, useFindAndModify: false }, (err, doc) => {
		if (err) {
			console.log(err)
			res.send('false')
		}
		else {
			console.log("user의 challenge 삭제")
			console.log(doc._id)
			res.send('true')
		}
	})
}

async function LogIn(req, res, next) {
    const id = req.body.userId;
    const pw = req.body.userPw;
    console.log("id, pw :"+id+" "+pw);
    // DB에서 user 정보 조회 
    try {
        const user = await User.loginCheck(id, pw);
        // 해당 user 정보 속 pw와 입력으로 들어온 pw가 같은지 확인
        console.log("----");
        console.log(user);
        //같으면 jwtToken 발급 
        
        if (user) {
            // const token = jwt.createToken(user);
            const token = jwt.sign({
                    user_id: user.user_id,
                    git_id: user.git_id,
                }
                , SecretKey, {
                    expiresIn: '1h'
                }
            );
            res.cookie('user', token, { sameSite:'none', secure: true });
            res.status(201).json({
                result: 'ok',
                token
            });
        }
        else 
            res.status(400).json({ error: 'invalid user' });
    }catch (err) {
        res.status(401).json({ error: 'invalid user' });
        console.error(err);
        next(err);
    }
}

function LogOut(req, res, next) {
    try{
        console.log("logout");
        res.cookie("user", "", { sameSite:'none', secure: true }).json({logoutSuccess: true});
    }catch (err) {
        res.status(401).json({ error: 'error' });
        console.error(err);
        next(err);
    }
}
function VerifyToken(req, res, next) {
    try {
        console.log("verify Token");
        // console.log(req.cookies);
        // console.log(req.cookies.user);
        const clientToken = req.cookies.user;
        
        const decoded = jwt.verify(clientToken, SecretKey);
        console.log(decoded);
        if (decoded) {
            // console.log(decoded);
            // res.locals.userId = decoded.user_id;
            res.status(201).json({userId: decoded.user_id, gitId: decoded.git_id});
            next();
        }
        else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch(err) {
        // console.log(err);
        res.status(401).json({ error: 'token expired' });
    }
}

module.exports = {
    createUser: CreateUser,
    deleteUser: DeleteUser,
    logIn : LogIn,
    logOut : LogOut,
    getChallengeList: GetChallengeList,
    joinChallenge: JoinChallenge,
    verifyToken: VerifyToken,
	outChallenge: OutChallenge
};