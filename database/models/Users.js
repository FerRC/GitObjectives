const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
Id: String,
Nombre: String
});

const User = mongoose.model('User', UserSchema)

module.exports = User;