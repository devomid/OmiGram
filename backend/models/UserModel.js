const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String, required: true, match: /^[A-Za-z0-9_.-]+$/, trim: true, index: true
  },
  firstName: {
    type: String, required: true,
  },
  lastName: {
    type: String, required: true,
  },
  email: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true,
  },
  friends: [{
    type: String,
  }],
  birthDate: {
    type: Date, required: true
  },
  avatar: {
    type: String
  },
  phoneNumber: {
    type: Number, required: true
  },
  city: String,
  status: Boolean,
  occupation: String,
  education: String,
  location: String,
  bio: String,
  gender: String
});

module.exports = mongoose.model('UserModel', userSchema);
