var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema ({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	content: {
		type: String,
		required: [true, 'Content is required'],
		trim: true
	}
});

module.exports = mongoose.model('Comment', commentSchema);