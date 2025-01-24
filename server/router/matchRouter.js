const express = require('express');
const router = express.Router();


const matchController = require('../controller/matchController');

const auth = require('../../middleware/auth');

router.get('/', auth.isLogin ,matchController.loadMatchPage );


module.exports = router