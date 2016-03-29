var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.cookie("Hello", "World");
	//console.log(req.cookies);
	var name = req.cookies.username || 'Anonymous';
	res.render('index', { title: 'Today I Learned' , name : name});
});

var username = "chance";
var password = "oneDayL8";

router.get('/login', function(req, res, next) {
	//res.cookie("Hello", "World");
	//console.log(req.cookies);
	res.render('login', { title: 'Login to Today I Learned' });
});

router.post('/login', function(req, res, next) {
	var sha1sum = crypto.createHash('sha1');
	
	req.db.driver.execQuery(
		"SELECT * FROM users WHERE email=?;", 
		[req.body.email],
		function(anErorr, data){
			if(anErorr) {
				console.log(anError)
			}
			sha1sum.update(req.body.password);
			var hashed_input = sha1sum.digest('hex');
			
			if (hashed_input === data[0].password) {
				res.cookie('username', data[0].username);
				res.redirect('/til/');
			}
			else {
				res.redirect('/login');
			}
			
		}
	);
	
});

router.get('logout', function(req, res) {
	res.clearCookie('username');
	res.redirect("/");
});

module.exports = router;
