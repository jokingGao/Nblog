
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: Schema.Types.ObjectId,
    postID: Schema.Types.ObjectId,
    content: String
});

var comment = mongoose.model("Comment", commentSchema);

// create a comment under the post
var create = function(Ncomment) {
    var newComment = new comment(Ncomment);
    return newComment.save();
}

// get all comments under the post
var getComments = function(postID) {
    return comment.find({postID: postID})
                   .populate({path: 'author', model: 'User'})
                   .exec();
}

// delete a specified comment
var deleteCommentByID = function(commentID, author) {
    return comment.remove({ _id: commentID, author: author}).exec();
}

// delete all comments under the post
var delCommentsByPostID = function(postID) {
    return comment.remove({postID: postID}).exec();
}

// get the number of comments under the post

var getCommentsCount = function(postID) {
    return comment.count({postID: postID}).exec();
}

module.exports = {
    create: create,
    getComments: getComments,
    deleteCommentByID: deleteCommentByID,
    delCommentsByPostID: delCommentsByPostID,
    getCommentsCount: getCommentsCount
};