var express     = require('express'),
		router      = express.Router(),
		passport    = require('passport'),
		User     		= require('../models/user');

// Sign up form
router.get('/register', function (req, res) {
	res.render('register');
});

// Sign up logic
router.post('/register', function (req, res) {
	newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		console.log('User registered');
		res.redirect('/login');
	});
});

// login form
router.get('/login', function (req, res) {
	res.render('login');
});

// login logic
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}), function (req, res) {});

// logout
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;