const mongoose = require('mongoose');

const { Schema } = mongoose;

const accTypeModel = new Schema({
  _id: { type: String },
  name: { type: String },
});

module.exports = mongoose.model('AccType', accTypeModel);
