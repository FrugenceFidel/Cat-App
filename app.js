var express                    = require('express'),
		mongoose                   = require('mongoose'),
		methodOverride						 = require('method-override'),
		passport                   = require('passport'),
		LocalStrategy              = require('passport-local'),
		User                       = require('./models/user'),
		passportLocalMongoose      = require('passport-local-mongoose'),
		bodyParser                 = require('body-parser');

var app                        = express(),
		catRouter                  = require('./routes/cats'),
		commentRouter              = require('./routes/comments'),
		seedDB                     = require('./seedDB'),
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

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'Any words to want',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(catRouter);
app.use(commentRouter);
// seedDB();

// Route
// root - route
app.get('/', function (req, res) {
	res.redirect('/cats');
});

// Auth routes
// Sign up form
app.get('/register', function (req, res) {
	res.render('register');
});

// Sign up logic
app.post('/register', function (req, res) {
	newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		console.log('User registered');
		res.redirect('/login');
	});
});

// login form
app.get('/login', function (req, res) {
	res.render('login');
});

// login logic
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}), function (req, res) {});

// logout
app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.listen(port, function () {
	console.log('App started at port ' + port);
});