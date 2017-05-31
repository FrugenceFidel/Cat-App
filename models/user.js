var mongoose              = require('mongoose'),
		passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minlength: 1,
		trim: true
	},
	password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);