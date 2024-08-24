const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'login' }); 

const Login = mongoose.model('Login', LoginSchema);

module.exports = Login;
