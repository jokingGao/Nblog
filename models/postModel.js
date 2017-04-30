var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    author: {type: Schema.Types.ObjectId},
    content: String,
    title: String,
    view: Number
});

var post = mongoose.model("Post", postSchema);



var createPost = function(blogPost) {
    var newPost = new post(blogPost);
    return newPost.save();
}

var getPosts = function(author) {
    var query = {};
    if (author) {
        query.author = author;
    }

    return post.find(query)
                .populate({path: 'author', model: 'User'})
                .sort({_id: -1})
                .exec();
}


module.exports = {
    createPost: createPost,
    getPosts: getPosts
};