const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
  name: String,
  phone_number: String,
});

module.exports = mongoose.model('Name', nameSchema);