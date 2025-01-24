const express = require('express');
const router = express.Router();


const partnerPreference = require('../controller/partnerPreferenceController')
const auth = require('../../middleware/auth');

router.get('/', auth.isLogin ,partnerPreference.loadPartnerPreference )


module.exports = router