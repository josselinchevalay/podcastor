 // app/routes.js

// grab the nerd model
var Oauth = require('./Oauth/Oauth.js');
var userModel = require('./model/user');

// ensure auth
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.status(403);
	res.send();
}


module.exports = function(app, passport) {

	// Oauth
	var oauth = new Oauth();
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
  // User
	app.get('/api/user', ensureAuthenticated, function(req, resp){
		  var currentAuthId = req.session.passport.user.id;
			var currentUser 	= userModel.findByAuth(currentAuthId);
			resp.json(currentUser);
	});

	app.post('/api/user', function(req, resp){

	});

	app.put('/api/user', function(req, resp){

	});

	app.delete('/api/user', function(req, resp){

	});

	/*** OAUTH ******/



	// signin
	app.post('/api/oauth/signin', function(req, resp){
		var user = req.body;
		var credentials = JSON.parse(req.body.Credentials);
		user.Credentials = credentials;
		user = oauth.signin(user, dataBase);
		resp.json(user);
	});


	// connect
	app.post('/api/oauth/connect', function(req, resp){
		var ticket = oauth.connect(req, dataBase);
		if( ticket.isAuthorize ){
			resp.statusCode = 200;
			resp.json(ticket.User);
			return;
		}
		resp.statusCode = 403;
		resp.json({"msg":"bad credentials !"});
		return;
	});



	// revive
	app.all('api/oauth/revive', function(req, resp){
		if(usr = oauth.isAuthorize(req, dataBase)){
			usr = oauth.revive(usr);
			resp.statusCode = 200;
			resp.json(user);
			return;
		}
		resp.statusCode = 403;
		resp.json({"msg":"bad credentials"});
		return;
	});

	/****************/

	//
	// sample api route
	/*app.get('/api/nerds', function(req, res) {
		// use mongoose to get all nerds in the database
		Nerd.find(function(err, nerds) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(nerds); // return all nerds in JSON format
		});
	});*/

	// route to handle creating (app.post)
	// route to handle delete (app.delete)
	require('./Routes/Oauth.js')(app, passport);
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // load our public/index.html file
	});

};
