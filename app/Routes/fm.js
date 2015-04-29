// ensure auth
var path = '/api/fm'
var model = require('../model/fm');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403);
  res.send();
};


module.exports = function(app, passport) {
  app.get(path, ensureAuthenticated, function(req, resp) {
    if (req.body.id) {
      var id = req.body.id;
      resp.json(model.findById(id));
    }
    resp.json(model.all());
  });
  app.put(path, ensureAuthenticated, function(req, resp){
    var fm = model.convert(req.body);
    if(model.findById(fm.uid)) {
      var check = model.update(fm);
    }
  });
  app.delete(path, ensureAuthenticated, function(req, resp){
     var fm = model.convert(req.body);
     try{
        model.remove(fm);
        resp.status = 200;
        resp.send();
     }catch(ex) {
        resp.status = 500;
        console.log(ex);
        resp.json(ex);
     }
  });
};
