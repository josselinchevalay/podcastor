
// ensure auth
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.status(403);
	res.send();
}


module.exports = function(app, passport) {
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
  // User
	require('./Routes/user.js')(app, passport);

	// FM
	require('./Routes/fm.js')(app, passport);

  // Oauth
	require('./Routes/Oauth.js')(app, passport);
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // load our public/index.html file
	});

};
