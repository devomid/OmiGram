const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.SEC_KEY;
const createToken = function (_id) {
  return jwt.sign({ _id }, secretKey, { expiresIn: '3d' })
};

const signupUser = async (req, res) => {
  // console.log('begining of controller');

  const {
    username,
    firstName,
    lastName,
    email,
    password,
    friends,
    birthDate,
    phoneNumber,
  } = req.body;

  // console.log('email in signup function:', email);
  // console.log('first name in signup function:', firstName);
  // console.log('last name in signup function:', lastName);
  // console.log('username in signup function:', username);
  // console.log('password in signup function:', password);
  // console.log('birth in signup function:', birthDate);
  // console.log('phone in signup function:', phoneNumber);

  try {
    const usernameExists = await UserModel.findOne({ username });
    if (usernameExists) return (res.status(400).json({ error: 'Username is already in use.' }));

    const emailExists = await UserModel.findOne({ email });
    if (emailExists) return (res.status(400).json({ error: 'Email is already in use.' }));

    if (password.length < 8) return (res.status(400).json({ error: 'Password is not strong enough.' }));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      friends,
      birthDate,
      phoneNumber,
    })
    const token = createToken(user._id);
    // console.log(user);
    res.status(201).json({ user, token });

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const signinUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    // console.log('user from sign in:', user);
    const token = createToken(user._id);
    if (!user) return (res.status(400).json({ error: "User does not exist." }));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return (res.status(400).json({ error: "Invalid credentials." }));
    res.status(200).json({ user, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

module.exports = {
  signupUser,
  signinUser
}