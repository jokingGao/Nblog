var express = require('express');
var router = express.Router();
var postModel = require('../models/postModel');
var checkLogin = require('../middlewares/check').checkLogin;

//post an  article
router.post('/', checkLogin, function(req, res, next) {
    var title = req.fields.title;
    var content = req.fields.content;
    var author = req.session._id;
    
    //check condition
    try {
        if (!title) {
            throw new Error('Invalid title!');
        }
        if (!content) {
            throw new Error('Invalid content!');
        }
    } catch(e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var post = {
        author: author,
        title: title,
        content: content,
        view: 0
    };


    postModel.createPost(post)
    .then(function(result) {
        post = result;
        req.flash('success', 'Posted successfully!');
        res.redirect(`/posts/{post._id}`)
    })
    .catch(next);
});

//get to the article posting page
router.get('/create', checkLogin, function(req, res) {
    res.render('create');
});

//get all articles
router.get('/', function(req, res, next) {
    
    var author = req.query.author;
    postModel.getPosts(author)
    .then(function(posts) {
        res.render('posts', {posts: posts})
    })
    .catch(next);
    
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


//create a comment
router.post('/postID/comment', checkLogin, function(req, res) {
        res.send(req.flash());
});

//delete a comment
router.get('/postID/comment/commentID/remove', checkLogin, function(req, res) {
        res.send(req.flash());
});

module.exports = router;
