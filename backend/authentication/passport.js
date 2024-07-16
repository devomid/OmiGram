const googleAuth = require('passport-google-oauth20');
const passport = require('passport');
const dotenv = require('dotenv');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');


console.log('in passport befor everything');
dotenv.config();
const GoogleStrategy = googleAuth.Strategy;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl = process.env.GOOGLE_AUTH_CALLBACK_URL;
const secretKey = process.env.SEC_KEY;


passport.use(new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: googleCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  // console.log('in passport befor db');
  // console.log(profile.name);
  try {
    const createToken = function (_id) {
      return jwt.sign({ _id }, secretKey, { expiresIn: '300d' })
    };
    const user = await UserModel.findOne({ email: profile.emails[0].value });

    if (user) {
      user.email = profile.emails[0].value;
      // console.log('there is a user');
      const token = createToken(user._id);
      // console.log(token);
      return done(null, { user: user, token });
    } else {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 21);
      const newUser = new UserModel({
        username: profile.emails[0].value.split("@")[0],
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        birthDate: birthDate,
        picture: profile.photos[0].value,
        phoneNumber: 999999999,
        password: profile.emails[0].value.split("@")[0]
      });
      // console.log('in passport befor save');
      await newUser.save();
      // console.log('before token');
      const token = createToken(newUser._id);
      // console.log('after token');
      return done(null, { user: newUser, token });
    }
  } catch (error) {
    return done(error);
  }
}));
// console.log('in passport befor serialize');
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
// console.log('passport finished');
