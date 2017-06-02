var middlewareObj = {},
		Comment       = require('../models/comment'),
		Cat           = require('../models/cat');

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

middlewareObj.catOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		Cat.findById(req.params.id, function (err, cat) {
			if (err) {
				console.log(err);
			} else {
				if (cat.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

middlewareObj.commentOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, comment) {
			if (err) {
				console.log(err);
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

module.exports = middlewareObj;