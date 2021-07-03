
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const commitDataController = require('../controllers/commitDataController');
const challengeController = require('../controllers/challengeController');
const approveController = require('../controllers/approveController');
const mailContriller = require('../controllers/authMailController');
// <-- userCon
router.post('/signup', userController.createUser);
router.delete('/signout/:id', userController.deleteUser);
router.get('/challenge/list/:userId', userController.getChallengeList);
router.patch('/challengeIn/user', userController.joinChallenge);
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
router.post('/grass', commitDataController.createInitData);
router.get('/grass', commitDataController.getData);
router.delete('/grass', commitDataController.deleteData);
router.put('/grass', commitDataController.putData);
// gitCrawlData -->

router.post('/challenge', challengeController.createChallenge);
router.post('/challengeKing/:id', challengeController.whoIsKing);

router.get('/challenge/:challengeId', challengeController.getChallengeInfo);
router.get('/challengeKing/:challengeId', challengeController.whoIsKing);
router.get('/challengePoor/:challengeId', challengeController.whoIsPoor);
router.patch('/challenge/:challengeId', challengeController.fixChallengeInfo);
router.delete('/challenge/:challengeId', challengeController.deleteChallenge);

router.patch('/challengeIn/challenge', challengeController.joinChallenge);
router.patch('/challengeOut/challenge', challengeController.outChallenge);

router.post('/challenge/approve/modal', approveController.createApprove);
router.delete('/challenge/approve/modal', approveController.deleteApprove);
router.get('/challenge/approve/modal', approveController.getApprove);

module.exports = router;
