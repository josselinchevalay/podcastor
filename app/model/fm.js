/**
 *
 */
'use strict'

var _ = require('underscore')
var database = require('../../config/config')

var _db = database.Db('PodCastor')

function load() {
  return _db.where({
    type: 'Fm'
  });
}

function loadUsers(uids) {
  return _.map(uids, function(element) {
    return _db.find({
      type: 'User',
      uid: element
    });
  });
}

function all() {
  return _.map(load(), function(row) {
    return {
      'uid': row.uid,
      'name': row.name,
      'author': _db.find({
        type: 'User',
        uid: row.author
      }),
      'description': row.description,
      'like': loadUsers(row.like),
      'dislike': loadUsers(row.dislike),
      'followers': loadUsers(row.followers),
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

module.exports = {
  all: all,
  add: add,
  findById: findById
};
