const express = require('express');
// const { areComponentsEqual } = require('react-hot-loader');
const Challenge = require('../models/challengeModel');
const mongoose = require('mongoose');
const db = mongoose.connection;

function CreateChallenge (req,res) {
    const {name,challenge_id,challenge_start,challenge_user_name,challenge_leader}=req.body;
    let newChallenge = null;
  
    const create = (challenge)=>{
        if(challenge){
            throw new Error ('challengename exists')
        }else{
            return Challenge.create(name,challenge_id,challenge_start,challenge_user_name,challenge_leader);
        }
    }
    console.log(req.body);

    Challenge.findOneByUsername(name)
  .then(create)

  res.end("success");
}

function WhoIsKing (req, res) {
    var _id = req.params.id;
    var mysort={name:-1};
    db.collection("challenges").find("_id").sort(mysort).toArray(function(err,result){
        if(err){
            throw err;
        }
       console.log(result);
    } )


}


module.exports = {
    whoIsKing: WhoIsKing,
    createChallenge: CreateChallenge
};