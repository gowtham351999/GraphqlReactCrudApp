const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
    dob: String,
    native: String,
    martialStatus: String,
});

module.exports = mongoose.model('Author', authorSchema);