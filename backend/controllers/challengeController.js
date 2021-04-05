const express = require('express');
const { areComponentsEqual } = require('react-hot-loader');
const Challenge = require('../models/challengeModel');

function CreateChallenge (req,res) {

}
function WhoIsKing (req, res) {
    var _id = req.params.id;

    Challenge.findById(_id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
    })

}
module.exports = {
    whoIsKing: WhoIsKing,
    createChallenge: CreateChallenge
};