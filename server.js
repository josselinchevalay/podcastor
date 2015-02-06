// server.js

// modules =================================================
var express           = require('express');
var app               = express();
var bodyParser        = require('body-parser');
var methodOverride    = require('method-override');
var passport          = require('passport');
var facebookStrategy  = require('passport-facebook').Strategy;
var cookieParser      = require('cookie-parser');
var session           = require('express-session');
// configuration ===========================================

// config files
var Db = require('./config/config');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

// Passport ================================================
var id = require('./Id.js');
// Serialize User
passport.serializeUser(function(user, done){
  done(null, user);
});

// Deserialize User
passport.deserializeUser(function(obj, done){
  done(null, obj);
});

// config
passport.use(new facebookStrategy({
  clientID: id.facebook.clientID,
  clientSecret: id.facebook.clientSecret,
  callbackURL: id.facebook.callbackURL,
  enableProof: false
},
function(accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    return done(null,profile);
  });
}
));

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(cookieParser());
// use passport
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/Routes/Oauth.js')(app, Db, passport);
require('./app/routes')(app, Db); // configure our routes


// start app ===============================================
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
console.log('Magig DB on ');							// shoutout to the user bd on
exports = module.exports = app; 						// expose app
