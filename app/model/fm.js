/**
 *
 */
'use strict'

var _         = require('underscore')
var database  = require('../../config/config')
var hydrator  = require('../hydrator/');
var _db       = database.Db('PodCastor')

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
      'podcast': row.podcast
    };
  });
};

function add(fm) {
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
  convert: convertToObjet
};
