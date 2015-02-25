/**
 * User Model
 * @package app/model
 * @author josselin CHEVALAY <josselin54.chevalay@gmail.com>
 */
var _ = require('underscore')
var database = require('../../config/config')

var _db = database.Db('PodCastor')

/**
 * all
 * can return all user
 *
 * @return array
 */
function all() {
  return _db.where({
    type: 'User'
  });
};

/**
 * findByUID
 * can return user by UID
 * @params id  int uid for user
 *
 * @return user  Object
 */
function findByUID(id) {
  return _.find(this.all(), {
    uid: id
  });
};

/**
 * findByAUth
 * can return user by auth id
 * @params id  int authId
 *
 * @return user  Object
 */
function findByAuth(id) {
  return _.find(this.all(), {
    authId: id
  });
};

/**
 * add
 * can add user on lowdb
 * @params user  Object  represent user
 */
function add(user) {
  _db.push(user); // add on PodCastor DB
  database.Db.save(); // save LowDb
  return;
};

module.exports = {
  all: all,
  add: add,
  findByUID: findByUID,
  findByAuth: findByAuth
};
