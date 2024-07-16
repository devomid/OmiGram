const { signinUser, signupUser } = require("../controllers/userAuth");
const express = require('express');
const uploadAvatar = require("../middlewares/uploadAvatar");
const saveAvatar = require('../controllers/avatarUploadController')

const router = express.Router();

router.post('/signup/avatar', uploadAvatar);
router.post('/signup', signupUser);
router.post('/login', signinUser);

module.exports = router;