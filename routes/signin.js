var express = require('express');
var sha1 = require('sha1');
var router = express.Router();
var userModel = require('../models/userModel');

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res) {
    res.render('signin');
});

router.post('/', checkNotLogin, function(req, res, next) {
    var name = req.fields.name;
    var password = req.fields.password;
    userModel.getUserByName(name)
    .then(function(user) {
        if (!user) {
            req.flash('error', 'User does not exist!');
            return res.redirect('back');
        }
        if (sha1(password) !== user.password) {
            req.flash('error', 'Password is not correct');
            return res.redirect('back');
        }
        req.flash('success', 'You have signed in successfully!');
        req.session.user = user;
        res.redirect('/posts');
    })
    .catch(next);
});

module.exports = router;