const mongoose = require('mongoose');

const { Schema } = mongoose;

const offerModel = new Schema({
  _id: { type: String },
  offererId: { type: String },
  offeredId: { type: String },
  offererAccountIds: [
    { type: String }
  ],
  offeredAccountIds: [
    { type: String }
  ],
  offererAccept: { type: Boolean },
  offeredAccept: { type: Boolean },
  processed: { type: Boolean },
  processedTime: { type: Date },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', offerModel);
