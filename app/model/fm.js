/**
 *
 */
var _ = require('underscore')
var database = require('../../config/config');

var _db = database.Db('PodCastor');

function all() {
  return _db.where({
    type: 'Fm'
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
