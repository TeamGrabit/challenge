const express = require('express');
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

module.exports = {
    createUser: CreateUser,
};