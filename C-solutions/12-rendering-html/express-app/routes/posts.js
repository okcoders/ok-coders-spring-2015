// require in the post model
var Post = require('./../model/post');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var posts = Post.all();
  res.render('posts/index', {
    posts: posts
  });
});

router.get('/new', function(req, res) {
  res.render('posts/new');
});

router.get('/:id', function(req, res) {
  var postId = req.params.id;
  var post = Post.find(postId);
  res.render('posts/show', {
    post: post
  });
});

router.get('/:id/edit', function(req, res) {
  var postId = req.params.id;
  res.render('posts/edit');
});

module.exports = router;