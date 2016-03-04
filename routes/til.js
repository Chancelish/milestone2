var express = require('express');
var router = express.Router();

var entries = [
  {slug:"Node JS", body: "Node.js is really powerful, but, it feels like it was created in a hury. I'm not sure what all the operations are.", created_at: "3/3/2016"},
  
];

/* GET til listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Today I Learned', entries: entries});
});

module.exports = router;
