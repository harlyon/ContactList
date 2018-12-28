const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: String,
    state: String,
    suburb: String,
    address: String,
    city: String,
    nameId: String
});

module.exports = mongoose.model('Country', countrySchema);