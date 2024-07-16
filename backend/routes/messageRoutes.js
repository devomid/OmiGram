const express = require('express');
const verifyToken = require('../middlewares/verification');
const { sendMsgWithPic, sendMsg, allMsgs } = require('../controllers/messageController');

router = express.Router();


router.post('/msgwithpic/:userId', verifyToken, sendMsgWithPic);
router.post('/', verifyToken, sendMsg);
router.get('/:chatId', verifyToken, allMsgs);

module.exports = router;

/* از یوزرنیم (یوزرنیم گیرنده) بعنوان آیدی چت روم استفاده میکنی که برای کار با سوکت به یوزرنیم گیرنده دسترسی داشتع باشی */