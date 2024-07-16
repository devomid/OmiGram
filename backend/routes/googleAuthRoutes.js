const passport = require('passport');
const completeGoogleSignup = require('../controllers/outterAuthController')
require('../authentication/passport');
const express = require('express');
const router = express.Router();


router.get('/', passport.authenticate('google', {
  scope: ['email', 'profile'],
  session: false
}), (req, res) => {
  const { user, token } = req.user;
  // console.log(user, token);
  res.json({ user, token });
});

router.get('/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/user/auth/google/success',
  failureRedirect: '/user/auth'
}));

router.get('/success', (req, res) => {
  const user = req.user
  res.json(user);
});

router.post('/googleComplete', completeGoogleSignup)

module.exports = router;