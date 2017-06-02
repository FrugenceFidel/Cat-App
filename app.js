var express                    = require('express'),
		mongoose                   = require('mongoose'),
		methodOverride						 = require('method-override'),
		passport                   = require('passport'),
		LocalStrategy              = require('passport-local'),
		User                       = require('./models/user'),
		passportLocalMongoose      = require('passport-local-mongoose'),
		flash                      = require('connect-flash'),
		bodyParser                 = require('body-parser');

var app                        = express(),
		catRouter                  = require('./routes/cats'),
		commentRouter              = require('./routes/comments'),
		userRouter                 = require('./routes/users'),
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
app.use(flash());

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

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(catRouter);
app.use(commentRouter);
app.use(userRouter);
// seedDB();

// Route
// root - route
app.get('/', function (req, res) {
	res.redirect('/cats');
});

app.listen(port, function() {
	console.log('App started at port ' + port);
});