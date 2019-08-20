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
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		req.flash('success', 'Now, login with your username and password.');
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
	failureRedirect: '/login',
	failureFlash: true
}), function (req, res) {});

// logout
router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success', 'You are logged out!!!');
	res.redirect('/cats');
});

module.exports = router;