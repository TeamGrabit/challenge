
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('../modules/jwt');

function getCurrentDate(){
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

function CreateUser (req, res) {

    const {user_id,user_pw,user_name,user_email,git_id}=req.body;

    let today= getCurrentDate();
    console.log(today);
    const in_date = today;
    const last_update = today;
  
    const create = (user)=>{
        if(user){
            throw new Error ('user exists')
        }else{
            return User.create(user_id,user_pw,user_name,user_email,git_id,in_date,last_update);
        }
    }
    User.findOneByUsername(user_id).then(create)
    res.end("result");
}

function DeleteUser (req, res) {
    var _id = req.params.id;

    User.findByIdAndDelete(_id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
    }
});
res.end('Delete')

}

async function LogIn(req, res) {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    console.log("id, pw :"+id+" "+pw);
    // DB에서 user 정보 조회 
    const user = await User.loginCheck(id, pw);
    // 해당 user 정보 속 pw와 입력으로 들어온 pw가 같은지 확인
    console.log("----");
    console.log(user);
    //같으면 jwtToken 발급 
    
    if (user) {
        const jwtToken = await jwt.sign(user);
        const token = jwtToken.token;
        const msg = "login successfully";
        return res.json({
            message: msg,
            token    
        })
    }
    else 
        return res.json({
            message: "fail"
        })
    
}
module.exports = {
    createUser: CreateUser,
    deleteUser: DeleteUser,
    logIn : LogIn
};