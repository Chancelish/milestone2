var express = require('express');
var router = express.Router();

var entries = [];
var username1;

/* GET til listing. */
router.get('/', function(req, res, next) {
	username1 = req.cookies.username || 'Anonymous';
	req.db.driver.execQuery(
		"SELECT * FROM todayIlearned;", 
		function(anError, data){
			if(anError) {
				console.log(anError)
			}
			res.render('til/index', { title: 'Today I Learned', entries: data, name: username1});
		}
	);
});


//CREATE
router.get('/new', function(req, res, next) {
	username1 = req.cookies.username || 'Anonymous';
	res.render('til/new', {title: "Create New Entry", name : username1});
});

router.post('/', function(req, res, next) {
	username1 = req.cookies.username || 'Anonymous';
	req.db.driver.execQuery(
		"INSERT INTO todayIlearned (slug,body,author) VALUES (?,?,?);",
		[req.body.slug, req.body.body, username1],
		function(anError, data){
			if(anError) {
				console.log(anError)
			}
			res.redirect(303, '/til/');
		}
	);
	
});

//UPDATE
router.get('/:id/edit', function(req, res, next) {
  
	req.db.driver.execQuery(
		"SELECT * FROM todayIlearned WHERE id=?;",
		[parseInt(req.params.id)],
		function(anError, data) {
			if(anError) {
				console.log(anError);
			}
			
			res.render('til/update', {title: "Update an Entry", entry: data[0], name : username1});
		}
	);
	
});

router.post('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	req.db.driver.execQuery(
		"UPDATE todayIlearned SET slug=? ,body=? ,autor=? WHERE id=?;",
		[req.body.slug, req.body.body, username1, parseInt(req.params.id)],
		function(anError, data) {
			if(anError) {
				console.log(anError);
			}
			
			res.redirect(303, '/til/' + id);
		}
	);
  
});

//DELETE
router.get('/:id/delete', function(req, res, next) {
	username1 = req.cookies.username || 'Anonymous';
    req.db.driver.execQuery(
		'DELETE * FROM todayIlearned WHERE id=' + parseInt(req.params.id) + ';',
		function(anError, data) {
			if(anError) {
				consle.log(anError);
			}
			
		}
		
	);
	res.redirect(303, '/til/');
  
});

//
router.get('/:id', function(req, res, next) {
	username1 = req.cookies.username || 'Anonymous';
	req.db.driver.execQuery(
		'SELECT * FROM todayIlearned WHERE id=?;',
		[parseInt(req.params.id)],
		function(anError, data) {
			if(anError) {
				console.log(anError);
			}
			res.render('til/til', {title: "a entry", entry : data[0], name: username1});
		}
	);
	
	
});

module.exports = router;
