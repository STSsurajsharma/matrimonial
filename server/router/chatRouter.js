const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../../middleware/auth');

const chatController = require('../controller/chatController');


// Handle the image upload request
// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.get('/private/:id', auth.isLogin , chatController.getChatPage);
router.get('/', auth.isLogin  ,chatController.chatsLoad);


// Initialize multer with the storage configuration
module.exports = router;
