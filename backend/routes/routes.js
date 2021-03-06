
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const gitDataController = require('../controllers/gitDataController');
const challengeController = require('../controllers/challengeController');
const approveController = require('../controllers/approveController');
const grassController = require('../controllers/grassController');
const authMailController = require('../controllers/authMailController');
const alarmController = require('../controllers/alarmController');

// <-- userCon
router.post('/signup', userController.createUser);
router.delete('/signout/:id', userController.deleteUser);
router.get('/challenge/list/:userId', userController.getChallengeList);
router.patch('/user/:challenge_id/out', userController.outChallenge);
router.post('/login', userController.logIn);
router.post('/logout', userController.logOut);
router.post('/auth/jwtvalidcheck', userController.verifyToken);
router.get('/user/uniqueid/:user_id', userController.checkIdDupl);
router.patch('/user/changepw', userController.changePw);
router.patch('/user/change', userController.change);
router.get('/user/:user_id', userController.userInfomation);
// userCon -->

// <-- mailCon
router.post('/authmail/send', authMailController.sendAuthMail);
router.post('/authmail/check', authMailController.checkAuthNum);
router.post('/invite', authMailController.inviteUser);
router.get('/authmail/id/:email', authMailController.sendId);
// mailCon --> 

// <-- gitCrawlData
router.post('/grass', gitDataController.createInitData);
router.get('/grass', gitDataController.getData);
router.delete('/grass', gitDataController.deleteData);
router.put('/grass', gitDataController.putData);
// gitCrawlData -->

// <-- grassController 
router.get('/grass/personal', grassController.getPersonalGrass);
router.get('/grass/challenge', grassController.getChallengeGrass);
router.get('/grass/other', grassController.getOtherGrass);
// grassController -->

router.post('/challenge', challengeController.createChallenge);
router.get('/challenge', challengeController.getAllChallenge);
router.post('/challengeKing/:id', challengeController.whoIsKing);
router.get('/challenge/:challenge_id', challengeController.getChallengeInfo);
router.get('/challengeKing/:challenge_id', challengeController.whoIsKing);
router.get('/challengePoor/:challenge_id', challengeController.whoIsPoor);
router.patch('/challenge/:challenge_id', challengeController.fixChallengeInfo);
router.delete('/challenge/:challenge_id', challengeController.deleteChallenge);

router.patch('/challenge/:challenge_id/in', challengeController.joinChallenge);
router.patch('/challengeOut/challenge', challengeController.outChallenge);

router.post('/approve', approveController.createApprove);
router.delete('/approve/:approve_id', approveController.deleteApprove);
router.get('/approve/:approve_id', approveController.getApproveInfo);
router.patch('/approve/:approve_id', approveController.confirmApprove);
router.get('/approve/list/:ch_id', approveController.getApproveList);
router.get('/approve/all/:ch_id', approveController.getAllApproveList);

router.post('/alarm', alarmController.createAlarm);
router.get('/alarm', alarmController.getAlarms);
router.delete('/alarm', alarmController.deleteAlarm);
router.patch('/alarm', alarmController.readAlarm);

module.exports = router;
