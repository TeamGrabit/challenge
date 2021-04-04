const express = require('express');
const { areComponentsEqual } = require('react-hot-loader');
const User = require('../models/userModel');


function CreateUser (req, res) {
    var newUser = new User(req.body);
    
    newUser.save(function(error, data) {
        if (error) {
            console.log('save error');
        } 
        else {
            console.log('save success');
        }
    });
    res.end('createUser');
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