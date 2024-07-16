const express = require('express');
const verifyToken = require('../middlewares/verification');
const { editUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.patch('/account', verifyToken, editUser);
router.delete('/account', verifyToken, deleteUser);

module.exports = router