
const express = require('express');
const { areComponentsEqual } = require('react-hot-loader');

const User = require('../models/userModel');


function CreateUser (req, res) {

    const {User_name,User_password,email}=req.body;
    let newUser = null;
  
    const create = (user)=>{
        if(user){
            throw new Error ('user exists')
        }else{
            return User.create(User_name,User_password,email);
        }
    }

    User.findOneByUsername(User_name)
  .then(create)

  res.end("created")
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