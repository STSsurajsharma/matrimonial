const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const shortlistController = require('../controller/shortlistController');

router.get('/',auth.isLogin, shortlistController.getShortlistedUsers );
// Initialize multer with the storage configuration
module.exports = router;
