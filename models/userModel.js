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

var createUser = function(NUser) {
    var newUser = new user(NUser);
    return newUser.save();
}

var getUserByName = function(name) {
    return user.findOne({ username: name})
    .exec();
}

module.exports = {
    createUser: createUser,
    getUserByName: getUserByName
};