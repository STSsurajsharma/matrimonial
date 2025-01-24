const express = require('express');
const router = express.Router();


const searchController = require('../controller/searchController');

const auth = require('../../middleware/auth');


router.get('/',auth.isLogin, searchController.loadSearchPage);
router.post('/',auth.isLogin, searchController.searchController);



module.exports = router