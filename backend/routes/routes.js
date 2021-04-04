const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.delete('/signout/:id', userController.deleteUser);
//router.post('/users/regist',userController.doRegistUser);
module.exports = router;