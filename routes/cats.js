var express = require('express'),
		router  = express.Router(),
		middleware = require('../middleware'),
		Cat     = require('../models/cat');

// index - route
router.get('/cats', function (req, res) {
	Cat.find({}, function (err, cats) {
		if (err) {
			console.log(err);
		} else {
			res.render('cat/index', {cats: cats});
		}
	}).sort({createdAt: -1});
});

// new - route
router.get('/cats/new', middleware.isLoggedIn, function (req, res) {
	res.render('cat/new');
});

// create route
router.post('/cats', middleware.isLoggedIn, function (req, res) {
	Cat.create(req.body.cat, function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			cat.author.id = req.user._id;
			cat.author.username = req.user.username;
			cat.save();
			res.redirect('/cats');
		}
	});
});

// show - route
router.get('/cats/:id', function (req, res) {
	Cat.findById(req.params.id).populate('comments').exec(function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('cat/show', {cat: cat});
		}
	});
});

// edit - route
router.get('/cats/:id/edit', middleware.catOwner, function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('cat/edit', {cat: cat});
		}
	});
});

// update - route
router.put('/cats/:id', middleware.catOwner, function (req, res) {
	Cat.findByIdAndUpdate(req.params.id, req.body.cat, function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Cat has been successfully updated');
			res.redirect('/cats/' + req.params.id);
		}
	});
});

// destroy route
router.delete('/cats/:id', middleware.catOwner, function (req, res) {
	Cat.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Cat has been successfully deleted');
			res.redirect('/cats');
		}
	});
});

module.exports = router;