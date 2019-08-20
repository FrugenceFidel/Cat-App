var express    = require('express'),
		router     = express.Router({mergeParams: true}),
		middleware = require('../middleware'),
		Comment    = require('../models/comment'),
		Cat        = require('../models/cat');

// New route
router.get('/cats/:id/comments/new', middleware.isLoggedIn, function (req, res) {
	Cat.findById(req.params.id,function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('comment/new', {cat: cat});
		}
	});
});

// create route
router.post('/cats/:id/comments', middleware.isLoggedIn, function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					res.redirect('back');
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					cat.comments.push(comment);
					cat.save();
					res.redirect('/cats/' + req.params.id);
				}
			});
		}
	});
});

// Edit route
router.get('/cats/:id/comments/:comment_id/edit', middleware.commentOwner, function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			Comment.findById(req.params.comment_id, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					res.render('comment/edit', {cat: cat, comment: comment});
				}
			});
		}
	});
});

// update route
router.put('/cats/:id/comments/:comment_id', middleware.commentOwner, function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			console.log(err);
		} else {
			Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
				if (err) {
					res.redirect('back');
				} else {
					req.flash('success', 'Comment has been successfully updated');
					res.redirect('/cats/' + cat._id);
				}
			});
		}
	});
});

// Delete route
router.delete('/cats/:id/comments/:comment_id', middleware.commentOwner, function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			res.redirect('back');
		} else {
			Comment.findByIdAndRemove(req.params.comment_id, function (err) {
				req.flash('success', 'Comment has been successfully deleted');
				res.redirect('/cats/' + cat._id);
			});
		}
	});
});

module.exports = router;