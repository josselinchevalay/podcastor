/**
 *
 */


var _         = require('underscore')
var database  = require('../../config/config')
var hydrator  = require('../hydrator/')
var _db       = database.Db('PodCastor')
var userModel = require('./user.js');

function load() {
  return _db.where({
    type: 'Fm'
  });
}

function all() {
  return _.map(load(), function(row) {
    return {
      'uid': row.uid,
      'name': row.name,
      'author': hydrator.hydrate('User', row.author),
      'description': row.description,
      'like': hydrator.lazyLoad('User', row.like),
      'dislike': hydrator.lazyLoad('User', row.dislike),
      'followers': hydrator.lazyLoad('User', row.followers),
      'podcast': hydrator.lazyLoad('PodCast', row.followers),
      'type': row.type
    };
  });
};

function add(fm) {
  fm.author.fms.push(fm); // erease relation between Author => fm
  _db
    .chain()
    .find({uid: fm.author.uid, type:'User' })
    .assign(fm.author)
    .value(); // update user
    
    
  fm.like       = hydrator.unLazyLoad(fm.like);
  fm.dislike    = hydrator.unLazyLoad(fm.dislike);
  fm.followers  = hydrator.unLazyLoad(fm.followers);
  fm.author     = hydrator.unhydrate(fm.author);
  _db.push(fm);
  database.Db.save();
  return;
};

function findById(id) {
  return _.find(this.all(), {
    uid: id
  });
};

function update(object){
  object.like = hydrator.unLazyLoad(object.like);
  object.dislike = hydrator.unLazyLoad(object.dislike);
  object.followers = hydrator.unLazyLoad(object.followers);
  object.author = hydrator.unhydrate(object.author);
  var element = _db
          .chain()
          .find({uid:object.uid, type:'Fm'})
          .assign(object)
          .value();
  database.Db.save();
  return element;
};

function remove(object){
  var authorMapped = userModel.findByUID(object.author.uid);
  authorMapped.fms = _.without(authorMapped.fms,  _.find(authorMapped.fms, {uid:object.uid, type:'Fm'}));
  console.log(object);
  userModel.update(authorMapped);
  _db.remove({uid:object.uid, type:'Fm'});
  database.Db.save();
  return;
}

function convertToObjet(json){
  var obj = _.clone(json);
  obj.author = JSON.parse(obj.author);
  obj.followers = JSON.parse(obj.followers);
  obj.like = JSON.parse(obj.like);
  obj.dislike = JSON.parse(obj.dislike);
  return obj;
};

module.exports = {
  all: all,
  add: add,
  findById: findById,
  update: update,
  remove: remove,
  convert: convertToObjet
};
