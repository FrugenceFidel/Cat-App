const express                    = require('express'),
			mongoose                   = require('mongoose'),
			methodOverride						 = require('method-override'),
			bodyParser                 = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Route
// root - route
app.get('/', (req, res) => {
	res.redirect('/cats');
});

// index - route
app.get('/cats', (req, res) => {
	Cat.find({}).sort({createdAt: -1}).then((cats) => {
		res.render('cats', {cats});
	}, e => {
		console.log(e);
	});
});

// new - route
app.get('/cats/new', (req, res) => {
	res.render('new');
});

// create route
app.post('/cats', (req, res) => {
	var data = req.body.cat;
	Cat.create(data).then(cat => {
		res.redirect('/cats');
	}, e => {
		console.log(e);
	})
});

// show - route
app.get('/cats/:id', (req, res) => {
	var id = req.params.id;
	Cat.findById(id).then(cat => {
		res.render('show', {cat});
	}, e => {
		console.log(e);
	});
});

// edit - route
app.get('/cats/:id/edit', (req, res) => {
	var id= req.params.id;
	Cat.findById(id).then(cat => {
		res.render('edit', {cat});
	}, e => {
		console.log(e);
	});
});

// update - route
app.put('/cats/:id', (req, res) => {
	var id= req.params.id;
	var data = req.body.cat;
	Cat.findByIdAndUpdate(id, data).then(cat => {
		res.redirect('/cats/' + id);
	}, e => {
		console.log(e);
	});
});

// destroy route
app.delete('/cats/:id', (req, res) => {
	var id= req.params.id;
	Cat.findByIdAndRemove(id).then((cat) => {
		res.redirect('/cats');
	}, e => {
		console.log(e);
	});
});

app.listen(port, () => {
	console.log(`App started at port ${port}`);
});