var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//post an  article
router.post('/', checkLogin, function(req, res) {
    res.send(req.flash());
});

//get to the article posting page
router.get('/create', checkLogin, function(req, res) {
    res.send(req.flash());
});

//get all articles
router.get('/', function(req, res) {
    res.send(req.flash());
});

//get a specific article
router.get('/:postID', function(req, res) {
    res.send(req.flash());
});


//delete an article
router.get('/postID/remove', checkLogin, function(req, res) {
    res.send(req.flash());
});


//get to the article editing page
router.get('/postID/edit', checkLogin, function(req, res) {
    res.send(req.flash());
});

//edit an article
router.post('/postID/edit', checkLogin, function(req, res) {
    res.send(req.flash());
});

//make a comment
router.post('/', checkLogin, function(req, res) {
    res.send(req.flash());
});

//create a comment
router.post('/postID/comment', checkLogin, function(req, res) {
        res.send(req.flash());
});

//delete a comment
router.get('/postID/comment/commentID/remove', checkLogin, function(req, res) {
        res.send(req.flash());
});

module.exports = router;
