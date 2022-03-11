const mongoose = require('mongoose');

const squareSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  },
  price:{
    type: Number
  },
  owner:{
    type: String
  }

}, { timestamps: true });

const Square = mongoose.model('Square', squareSchema);
module.exports = Square;