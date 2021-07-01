
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const challengeController = require('../controllers/challengeController');
const approveController = require('../controllers/approveController');


router.post('/users', userController.createUser);
router.post('/challenge', challengeController.createChallenge);
router.delete('/signout/:id', userController.deleteUser);
router.post('/challengeKing/:id', challengeController.whoIsKing);
router.patch('/challegeOut/challenge', challengeController.delUserInchallege);
router.patch('/challegeOut/user', userController.delchInUser);

router.get('/challenge/list/:userId', userController.getChallengeList);
router.get('/challenge/:challengeId', challengeController.getChallengeInfo);
router.get('/challengeKing/:challengeId', challengeController.whoIsKing);
router.get('/challengePoor/:challengeId', challengeController.whoIsPoor);
router.patch('/challenge/:challengeId', challengeController.fixChallengeInfo);
router.delete('/challenge/:challengeId', challengeController.deleteChallenge);
router.patch('/challengeIn/challenge', challengeController.joinChallenge);
router.patch('/challengeIn/user', userController.joinChallenge);

router.post('/challenge/approve/modal', approveController.createApprove);
router.delete('/challenge/approve/modal', approveController.deleteApprove);
router.get('/challenge/approve/modal', approveController.getApprove);

//router.post('/users/regist',userController.doRegistUser);
module.exports = router;
