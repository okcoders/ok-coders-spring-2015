var express = require('express');
var router = express.Router();

router.get('/:pid/comments', function(req, res) {
  res.status(404).send('all comments, post: ' + req.params.pid );
});

router.get('/:pid/comments/new', function(req, res) {
  res.status(404).send('new comment form, post: ' + req.params.pid);
});

router.post('/:pid/comments', function(req, res) {
  res.status(404).send('create comment, post: ' + req.params.pid)
});

router.get('/:pid/comments/:id', function(req, res) {
  res.status(404).send('show a comment, post: ' + req.params.id + 
                      ' comment: ' + req.params.pid);
});

router.get('/:pid/comments/:id/edit', function(req, res) {
  res.status(404).send('edit comment, post: ' + req.params.pid + 
                      ' comment: ' + req.params.id);
});

router.put('/:pid/comments/:id', function(req, res) {
  res.status(404).send('update commen, post: ' + req.params.pid + 
                      ' comment: ' + req.params.id);
});

router.delete('/:pid/comments/:id', function(req, res) {
  res.status(404).send('delete comment, post: ' + req.params.pid + 
                      ' comment: ' + req.params.id);
});

module.exports = router;