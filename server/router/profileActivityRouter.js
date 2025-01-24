const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const profileActivity = require('../controller/profileActivityController')

router.get('/',  auth.isLogin, profileActivity.loadActivity)
router.get('/send-interest', auth.isLogin, profileActivity.loadSendInterest );
router.get('/receive-interest', auth.isLogin, profileActivity.loadReceivedInterest);
router.get('/pending-interest', auth.isLogin, profileActivity.loadPendingInterest);
router.get('/reject-interest', auth.isLogin, profileActivity.loadRejectInterest);


// Handling the post 
router.post('/cancel-interest/:id', auth.isLogin, profileActivity.cancelSendInterest);
// 
router.post('/accept-interest/:id', auth.isLogin, profileActivity.acceptInterest);

module.exports = router