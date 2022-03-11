const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType:{
    type: String,
    required: true
  },
  money:{
    type: Number
  },
  properties:{
    type: Array
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;