var express = require('express');

var checkLogin = require('../middlewares/check').checkLogin;

var router = express.Router();

router.get('/', checkLogin, function(req, res) {
    res.send(req.flash());
});

module.exports = router;