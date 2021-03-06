var path = '/api/user'
var model = require('../model/user');
// ensure auth
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403);
  res.send();
}


module.exports = function(app, passport) {
  app.get('/api/connect', ensureAuthenticated, function(req, resp) {
    var currentAuthId = req.session.passport.user.id;
    var currentUser = model.findByAuth(currentAuthId);
    resp.json(currentUser);
  });

  app.get(path, ensureAuthenticated, function(req, resp) {
    if (req.body.id) {
      var id = req.body.id;
      resp.json(model.findByUID(id));
    }
    resp.json(model.all());
  });

  app.post(path, function(req, resp) {

  });

  app.put(path, function(req, resp) {

  });

  app.delete(path, function(req, resp) {

  });
}
