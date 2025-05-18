const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactShema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Contact', contactShema);