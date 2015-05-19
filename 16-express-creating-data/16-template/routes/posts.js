var express = require('express');
var router = express.Router();

var Post = require('./../models/post');

// posts

router.get('/', function(req, res) {
  Post.find({}).exec(function(err, posts) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else {
      res.render('posts/index', {posts: posts});
    }
  });
});

router.get('/new', function(req, res) {
  res.render('posts/new');
});

router.post('/', function(req, res) {
  res.status(404).send('create post')
});

router.get('/:id', function(req, res) {
  Post.findById(req.params.id).exec(function(err, post) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      res.render('posts/show', {post: post});
    }
  });
});

router.get('/:id/edit', function(req, res) {
  Post.findById(req.params.id).exec(function(err, post) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      res.render('posts/edit', {post: post});
    }
  });
});

router.put('/:id', function(req, res) {
  res.status(404).send('update post: ' + req.params.id);
});

router.delete('/:id', function(req, res) {
  res.status(404).send('delete post ' + req.params.id)
});

module.exports = router;