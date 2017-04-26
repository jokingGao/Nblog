var express = require('express');

var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//user sign up request
router.post('/', checkNotLogin, function(req, res) {
    res.send(req.flash());
})

//sign up web page
router.get('/', checkNotLogin, function(req, res) {
    res.render('signup');
});

module.exports = router;