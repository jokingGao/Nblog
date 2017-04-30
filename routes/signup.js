var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var userModel = require('../models/userModel');
var sha1 = require('sha1');
var path = require('path');
var fs = require('fs');

//user sign up request
router.post('/', checkNotLogin, function(req, res, next) {
    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var password = req.fields.password;
    var repassword = req.fields.repassword;
    var avatar = req.files.avatar.path.split(path.sep).pop();

    try {
        if (!(name.length>=1 && name.length<=10)) {
            throw new Error('The user name length must be from 1 to 10!');
        }
        if (!(repassword === password)) {
            throw new Error('The new and confirmed password do not match!');
        }
        if (!req.files.avatar.name) {
            throw new Error('Missing Avatar!');
        }
    }
    catch (e) {
        fs.unlink(req.files.avatar.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }
    password = sha1(password);
    var user = {
        username: name,
        gender: gender,
        bio: bio,
        password: password,
        avatar: avatar
    };

    userModel.createUser(user)
    .then(function(result) {
        
        delete result.password;
        req.session.user = result;
        req.flash('success', 'Signed up successfully!');
        res.redirect('/posts');
    })
    .catch(function(e) {
        fs.unlink(req.files.avatar.path);
        if (e.message.match('E11000 duplicate key')) {
            req.flash('error', 'user name already exists!');
            res.redirect('/signup');
        }
        next(e);
    });
});

//sign up web page
router.get('/', checkNotLogin, function(req, res) {
    res.render('signup');
});

module.exports = router;