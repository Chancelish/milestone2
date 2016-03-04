var express = require('express');
var router = express.Router();

var entries = [
  {slug:"Node JS", body: "Node.js is really powerful, but, it feels like it was created in a hury. I'm not sure what all the operations are.", created_at: "3/3/2016"},
  
];

/* GET til listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Today I Learned', entries: entries});
});

router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});


router.get('/:id/edit', function(req, res, next) {
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  res.render('til/index', { title: 'Today I Learned', entries: entries });
});

/**
I don't understand what this function is doing, I literally copied from the example.
*/
router.get('/:id', function(req, res, next) {
  res.render('til/til', {title: "an entry", entry: entries[req.params.id]});
});

module.exports = router;
