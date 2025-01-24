const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const accountSetting = require('../controller/accountController');
router.get('/', auth.isLogin , accountSetting.loadSettingPage )

router.post('/email-update/:id', auth.isLogin, accountSetting.emailUpdate);

router.post('/update-phone-privacy/:id', auth.isLogin, accountSetting.updatePhonePrivacy);
router.post('/update-photo-privacy/:id', auth.isLogin, accountSetting.updatePhotoPrivacy);
router.post('/change-password/:id', auth.isLogin, accountSetting.changePassword);


module.exports = router