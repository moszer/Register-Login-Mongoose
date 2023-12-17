const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: String,
    passwords: String,

});

module.exports = mongoose.model('User', userSchema)