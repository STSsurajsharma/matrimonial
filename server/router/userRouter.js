const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const userController = require('../controller/userController')

router.get('/', auth.isLogout , userController.indexPageLoad);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
// Submiting the Form Finally
router.post('/submit-form', userController.userRegister);

router.get('/login', auth.isLogout ,userController.loginLoad);
router.post('/login', userController.userLogin);
router.post('/login-from-home', userController.userLoginFromHome);

router.get('/home',auth.isLogin , userController.userHome);
router.get('/profile',auth.isLogin , userController.userProfile);


router.get('/shathiProfile/:id', auth.isLogin ,userController.shathiProfileLoad);

router.get('/logout',auth.isLogin , userController.logout);






module.exports = router;