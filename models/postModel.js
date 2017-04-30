var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    author: Schema.Types.ObjectId,
    content: String,
    title: String,
    view: Number
});

var post = mongoose.model("Post", postSchema);

var createPost = function(blogPost) {
    var newPost = new post(blogPost);
    return newPost.save(function(err) {
        if (err) {
            console.log(err);
        }
    });
}



module.exports = {
    createPost: createPost
};