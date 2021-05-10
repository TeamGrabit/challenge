
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const challengeController = require('../controllers/challengeController');
const approveController = require('../controllers/approveController');


router.post('/users', userController.createUser);
router.post('/challenge', challengeController.createChallenge);
router.delete('/signout/:id', userController.deleteUser);
router.post('/challengeKing/:id', challengeController.whoIsKing);

router.get('/challenge/list/:userId', challengeController.getChallengeList);
router.get('/challenge/:challengeId', challengeController.getChallengeInfo);
router.put('/challenge/:challengeId', challengeController.fixChallengeInfo);
router.delete('/challenge/:challengeId', challengeController.deleteChallenge);
router.post('/challengeIn', challengeController.joinChallenge);

router.post('/challenge/approve/modal', approveController.createApprove);
router.delete('/challenge/approve/modal', approveController.deleteApprove);
router.get('/challenge/approve/modal', approveController.getApprove);

//router.post('/users/regist',userController.doRegistUser);
module.exports = router;