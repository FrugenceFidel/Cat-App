var middlewareObj = {},
		Comment       = require('../models/comment'),
		Cat           = require('../models/cat');

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Login first!!');
	res.redirect('/login');
};

middlewareObj.catOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		Cat.findById(req.params.id, function (err, cat) {
			if (err) {
				res.redirect('back');
			} else {
				if (cat.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You don\'t have permission');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'Login first!!');
		res.redirect('back');
	}
};

middlewareObj.commentOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, comment) {
			if (err) {
				res.redirect('back');
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You don\'t have permission');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'Login first!!');
		res.redirect('back');
	}
};

module.exports = middlewareObj;