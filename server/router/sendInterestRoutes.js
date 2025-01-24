const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const sendInterestController = require('../controller/sendInterestController');

router.post('/', auth.isLogin, sendInterestController.sendInterest);


module.exports = router