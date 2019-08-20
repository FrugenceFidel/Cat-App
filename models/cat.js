var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var catSchema = new Schema ({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minlength: 1,
		trim: true
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		minlength: 1,
		trim: true
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minlength: 1,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

// Mongoose Model
module.exports = mongoose.model('Cat', catSchema);