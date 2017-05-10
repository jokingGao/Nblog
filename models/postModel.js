var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentModel = require('./commentModel');

var postSchema = new Schema({
    author: {type: Schema.Types.ObjectId},
    content: String,
    title: String,
    view: Number
});


var addCommentsCount = function(schema) {
    schema.post('find', function(posts) {
        return Promise.all(posts.map(function(post){
            return commentModel.getCommentsCount(post._id).then(function(commentsCount) {
                post.commentsCount = commentsCount;
                //console.log(post);
                return post;
            });
        })); 
    });
    schema.post('findOne', function(post) {
        if (post) {
            return commentModel.getCommentsCount(post._id).then(function(commentsCount) {
                post.commentsCount = commentsCount;
                return post;
            });
        }

        return post;
    });
}



postSchema.plugin(addCommentsCount);
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

var updatePostByID = function(postID, author, data) {
    return post.update({ _id: postID, author: author }, { $set: data })
    .exec();
}

var deletePostByID = function(postID, author) {
    return post.remove({ _id: postID, author: author})
    .exec()
    .then(function(res) {
        if (res.result.ok && res.result.n > 0) {
            commentModel.delCommentsByPostID(postID);
        }
    });
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    incView: incView,
    getPostByID: getPostByID,
    updatePostByID: updatePostByID,
    deletePostByID: deletePostByID
};