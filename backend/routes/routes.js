
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const challengeController = require('../controllers/challengeController');
const approveController = require('../controllers/approveController');


router.post('/users', userController.createUser);
router.post('/challenge', challengeController.createChallenge);
router.delete('/signout/:id', userController.deleteUser);
router.post('/challengeKing/:id', challengeController.whoIsKing);

router.get('/challenge/list/:userId', userController.getChallengeList);
router.get('/challenge/:challengeId', challengeController.getChallengeInfo);
router.patch('/challenge/:challengeId', challengeController.fixChallengeInfo);
router.delete('/challenge/:challengeId', challengeController.deleteChallenge);
router.patch('/keyChange/:challengeId', challengeController.changeKey)

router.patch('/challengeIn/challenge', challengeController.joinChallenge);
router.patch('/challengeIn/user', userController.joinChallenge);
router.patch('/challengeOut/challenge', challengeController.outChallenge);
router.patch('/challengeOut/user', userController.outChallenge);

router.post('/approve', approveController.createApprove);
router.delete('/approve/:approveId', approveController.deleteApprove);
router.get('/approve/:approveId', approveController.getApproveInfo);
router.patch('/approve/:approveId', approveController.confirmApprove);
router.get('/approve/list/:ch_id', approveController.getApproveList);

router.post('/invite/:challengeId', challengeController.inviteUser);


//router.post('/users/regist',userController.doRegistUser);
module.exports = router;
