
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: String,
  body: String,
  author: Number
});

var Post = mongoose.model('posts', schema);
module.exports = Post;

