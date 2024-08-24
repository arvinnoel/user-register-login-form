const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    profession: { type: String }
}, { collection: 'register' }); // Specify the collection name

const Register = mongoose.model('register', RegisterSchema);

module.exports = Register;
