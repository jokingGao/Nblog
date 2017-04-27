var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    gender: String,
    bio: String,
    avatar: String
});

var user = mongoose.model('User', userSchema);

module.exports = user;