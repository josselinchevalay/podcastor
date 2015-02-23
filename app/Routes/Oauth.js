module.exports = function(app, passport) {
  app.get('/auth/facebook', passport.authenticate('facebook'), function(req, resp){});
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
     res.redirect('/');
    });
};
