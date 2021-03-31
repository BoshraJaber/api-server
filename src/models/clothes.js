'use strict';
const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: String },
});
// this line will create the collection (sql table) with name 'person'
const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;