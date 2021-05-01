
const express = require('express');
const { areComponentsEqual } = require('react-hot-loader');
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

    const {User_name,User_password,email,git_account,challenge_count,in_date}=req.body;
    let Date= getCurrentDate(in_date);
    console.log(Date);
    let newUser = null;
  
    const create = (user)=>{
        if(user){
            throw new Error ('user exists')
        }else{
            return User.create(User_name,User_password,email,git_account,challenge_count,Date);
        }
    }
    

    User.findOneByUsername(User_name)
  .then(create)

  var mysort={challenge_count:-1};
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