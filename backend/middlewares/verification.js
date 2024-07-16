const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.SEC_KEY

const verifyToken = async (req, res, next) => {
  // verify authorization
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token requires!' })
  };

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, secretKey);
    // console.log('id from verification:', _id);

    req.user = await UserModel.findOne({ _id }).select('_id');
    next();

  } catch (error) {
    // console.log(error);
    res.status(401).json({ error })
  };
};


module.exports = verifyToken