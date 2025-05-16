const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactShema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Contact', contactShema);