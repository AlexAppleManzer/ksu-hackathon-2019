const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingModel = new Schema({
  _id: { type: String },
  created: { type: Date, default: Date.now},
  active: { type: Boolean },
  item: { 
    id: {type: String },
    accType: { type: String },
    amount: { type: Number }
  },
  accType: { type: String },
  acceptedAccTypes: [
    { type: String }
  ],
  userId: { type: String },
  description: { type: String },
  
});

module.exports = mongoose.model('User', listingModel);
