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
	decription: {
		type: String,
		required: [true, 'Decription is required'],
		minlength: 1,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Mongoose Model
module.exports = mongoose.model('Cat', catSchema);