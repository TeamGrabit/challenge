
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const gitDataController = require('../controllers/gitDataController');
const challengeController = require('../controllers/challengeController');
const approveController = require('../controllers/approveController');
const mailContriller = require('../controllers/authMailController');
// <-- userCon
router.post('/signup', userController.createUser);
router.delete('/signout/:id', userController.deleteUser);
router.get('/challenge/list/:userId', userController.getChallengeList);
router.patch('/challengeOut/user', userController.outChallenge);
router.post('/login', userController.logIn);
router.post('/logout', userController.logOut);
router.post('/auth/jwtvalidcheck', userController.verifyToken);
router.get('/user/uniqueid/:userId', userController.checkIdDupl);
// userCon -->

// <-- mailCon
router.post('/authmail/send', mailContriller.sendAuthMail);
router.get('/authmail/check', mailContriller.checkAuthNum);
// mailCon --> 

// <-- gitCrawlData
router.post('/grass', gitDataController.createInitData);
router.get('/grass', gitDataController.getData);
router.delete('/grass', gitDataController.deleteData);
router.put('/grass', gitDataController.putData);
// gitCrawlData -->

router.post('/challenge', challengeController.createChallenge);
router.post('/challengeKing/:id', challengeController.whoIsKing);
router.get('/challenge/:challengeId', challengeController.getChallengeInfo);
router.get('/challengeKing/:challengeId', challengeController.whoIsKing);
router.get('/challengePoor/:challengeId', challengeController.whoIsPoor);
router.patch('/challenge/:challengeId', challengeController.fixChallengeInfo);
router.delete('/challenge/:challengeId', challengeController.deleteChallenge);
router.patch('/keyChange/:challengeId', challengeController.changeKey)

router.patch('/challengeIn/challenge', challengeController.joinChallenge);
router.patch('/challengeOut/challenge', challengeController.outChallenge);
router.post('/invite/:challengeId', challengeController.inviteUser);

router.post('/approve', approveController.createApprove);
router.delete('/approve/:approveId', approveController.deleteApprove);
router.get('/approve/:approveId', approveController.getApproveInfo);
router.patch('/approve/:approveId', approveController.confirmApprove);
router.get('/approve/list/:ch_id', approveController.getApproveList);



router.post('/approve', approveController.createApprove);
router.delete('/approve/:approveId', approveController.deleteApprove);
router.get('/approve/:approveId', approveController.getApproveInfo);
router.patch('/approve/:approveId', approveController.confirmApprove);
router.get('/approve/list/:ch_id', approveController.getApproveList);

router.post('/invite/:challengeId', challengeController.inviteUser);


module.exports = router;
