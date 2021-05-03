
const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const User = require('../models/userModel');


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
    const last_date = today;
  
    const create = (user)=>{
        if(user){
            throw new Error ('user exists')
        }else{
            return User.create(user_id,user_pw,user_name,user_email,git_id,in_date,last_date);
        }
    }
    

    User.findOneByUsername(user_id)
  .then(create)

  var mysort={challenge_count:-1}; // ?? 왜있는거지
  db.collection("users").find().sort(mysort).toArray(function(err,result){
    if(err){
        throw err;
    }
    
    console.log(result[0]);
   
} )

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

module.exports = {
    createUser: CreateUser,

    deleteUser: DeleteUser

};