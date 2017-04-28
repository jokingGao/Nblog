var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    author: Schema.Types.ObjectId,
    content: String,
    title: String,
    view: Number
});

var post = mongoose.model("Post", postSchema);

module.exports = post;