var express                    = require('express'),
		mongoose                   = require('mongoose'),
		methodOverride						 = require('method-override'),
		bodyParser                 = require('body-parser');

var app                        = express(),
		catRouter                  = require('./routes/cats'),
		port                       = process.env.PORT || 3000;

// Mongoose Config
mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || 'mongodb://localhost/cat';
mongoose.connect(url);

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(catRouter);

// Route
// root - route
app.get('/', function (req, res) {
	res.redirect('/cats');
});

app.listen(port, function () {
	console.log('App started at port' + port);
});