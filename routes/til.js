var express = require('express');
var router = express.Router();

var entries = [];

/* GET til listing. */
router.get('/', function(req, res, next) {
	var name = req.cookies.username || 'Anonymous';
	req.db.driver.execQuery(
		"SELECT * FROM todayIlearned;", 
		function(anErorr, data){
			if(anErorr) {
				console.log(anError)
			}
			res.render('til/index', { title: 'Today I Learned', entries: data, name: name});
		}
	);
});

router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

router.post('/', function(req, res, next) {
	req.db.driver.execQuery(
		"INSERT INTO todayIlearned (slug,body,author) VALUES ('?','?','?');",
		[req.body.slug, req.body.body, req.cookie.username || 'Anonymous'],
		function(anErorr, data){
			if(anErorr) {
				console.log(anError)
			}
			res.redirect(303, '/til/index');
		}
	);
	
});

//UPDATE
router.get('/:id/edit', function(req, res, next) {
  
	req.db.driver.execQuery(
		"SELECT * FROM todayIlearned WHERE id=?;",
		[arseInt(req.params.id)],
		function(anError, data) {
			if(anError) {
				consle.log(anError);
			}
			
			res.render('til/update',
			{
				title: 'Update an entry',
				entry: data[0]
			});
		}
	);
	
});

router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

//DELETE
router.get('/:id/delete', function(req, res, next) {
	var name = req.cookies.username || 'Anonymous';
    req.db.driver.execQuery(
		'DELETE * FROM todayIlearned WHERE id=' + parseInt(req.params.id) + ';',
		function(anError, data) {
			if(anError) {
				consle.log(anError);
			}
			
		}
		
	);
	req.db.driver.execQuery(
		"SELECT * FROM todayIlearned;", 
		function(anErorr, data){
			if(anErorr) {
				console.log(anError)
			}
			res.render('til/index', { title: 'Today I Learned', entries: data, name: name});
		}
	);
  
});

//
router.get('/:id', function(req, res, next) {
	var name = req.cookies.username || 'Anonymous';
	req.db.driver.execQuery(
		'SELECT * FROM todayIlearned WHERE id=' + parseInt(req.params.id) + ';',
		function(anError, data) {
			if(anError) {
				consle.log(anError);
			}
			res.render('til/til', {title: "a entry", entry: data[0], name: name});
		}
	);
	
	
});

module.exports = router;
