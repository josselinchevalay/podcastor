

// ensure auth
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(403);
  res.send();
}

module.exports = function(app, passport) {
  app.get('/auth/facebook', passport.authenticate('facebook'), function(req, resp){});
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
     res.redirect('/');
    });
  app.get('/auth/logout', ensureAuthenticated, function(req, resp){
    req.session.passport.user = null;
    resp.redirect('/');
  });
};
