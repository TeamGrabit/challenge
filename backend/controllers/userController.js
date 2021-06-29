
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Challenge = require('../models/challengeModel');


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
    var _id = req.params.id;

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

	User.findOneByUsername(userId)
	.then((user) => {
		if(user){
			console.log("user의 challenge 정보 얻음");
			console.log(user.ch_list);
			res.send(user.ch_list);
		}else{
			throw new Error('not exist user')
		}
	})

}

function JoinChallenge(req, res) {		// user의 ch_list부분에 새로운 challengeId 추가.
    const { userId, challengeId } = req.body;

	var chArray;

	const join = () => User.findOneAndUpdate({ "user_id": userId }, {
        $set: {
            ch_list: chArray
        }
    }, { new: true, useFindAndModify: false }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("user에 challenge 추가")
            console.log(doc)
            res.send(doc)
        }
    })

	User.findOneByUsername(userId)
	.then((user)=> {
		chArray = user.ch_list;
		if(chArray.indexOf(challengeId)>=0){	// 이미 해당 Id의 challenge에 가입되어 있는지 확인.
			throw new Error('already join');
		}
		chArray.push(challengeId);
		
		Challenge.findById(challengeId)		// 해당 Id의 챌린지가 없다면 error 반환.
		.then((challenge) => {
			console.log(challenge)
			if(challenge===null){
				throw new Error('not exist challenge');
			}
		})

	}).then(join)
}

async function LogIn(req, res, next) {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
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
            res.cookie('user', token);
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

function VerifyToken(req, res, next) {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, SecretKey);
        if (decoded) {
            res.locals.userId = decoded.user_id;
            next();
        }
        else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch(err) {
        res.status(401).json({ error: 'token expired' });
    }
}
module.exports = {
    createUser: CreateUser,
    deleteUser: DeleteUser,
    logIn : LogIn,
    getChallengeList: GetChallengeList,
    joinChallenge: JoinChallenge,
    verifyToken: VerifyToken,
};