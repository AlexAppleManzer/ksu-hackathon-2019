const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  _id: { type: String },
  accounts: [
    { type: String }
  ]
});

module.exports = mongoose.model('User', userModel);
