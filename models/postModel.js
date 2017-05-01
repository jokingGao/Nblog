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

var incView = function(postID) {
    return post.update({ _id: postID}, { $inc: { view: 1 } })
    .exec();
}

var getPostByID = function(postID) {
    return post.findById(postID)
    .populate({ path: 'author', model: 'User' })
    .exec();
}


module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    incView: incView,
    getPostByID: getPostByID
};