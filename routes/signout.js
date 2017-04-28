var express = require('express');

var checkLogin = require('../middlewares/check').checkLogin;

var router = express.Router();

router.get('/', checkLogin, function(req, res) {
    req.session.user = null;
    req.flash('success', 'You have signed out successfully!');
    res.redirect('/posts');
});

module.exports = router;