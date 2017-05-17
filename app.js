var express                    = require('express'),
		mongoose                   = require('mongoose'),
		methodOverride						 = require('method-override'),
		bodyParser                 = require('body-parser'),
		app                        = express(),
		port                       = process.env.PORT || 3000;

// Mongoose Config
mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || 'mongodb://localhost/cat';
mongoose.connect(url);

// Mongoose Schema
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
var Cat = mongoose.model('Cat', catSchema);

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Route
// root - route
app.get('/', function (req, res) {
	res.redirect('/cats');
});

// index - route
app.get('/cats', function (req, res) {
	Cat.find({}, function (err, cats) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', {cats: cats});
		}
	}).sort({createdAt: -1});
});

// new - route
app.get('/cats/new', function (req, res) {
	res.render('new');
});

// create route
app.post('/cats', function (req, res) {
	Cat.create(req.body.cat, function (err, cat) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/cats');
		}
	});
});

// show - route
app.get('/cats/:id', function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			console.log(err);
		} else {
			res.render('show', {cat});
		}
	});
});

// edit - route
app.get('/cats/:id/edit', function (req, res) {
	Cat.findById(req.params.id, function (err, cat) {
		if (err) {
			console.log(err);
		} else {
			res.render('edit', {cat});
		}
	});
});

// update - route
app.put('/cats/:id', function (req, res) {
	Cat.findByIdAndUpdate(req.params.id, req.body.cat, function (err, cat) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/cats/' + req.params.id);
		}
	});
});

// destroy route
app.delete('/cats/:id', function (req, res) {
	Cat.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/cats');
		}
	});
});

app.listen(port, function () {
	console.log('App started at port' + port);
});