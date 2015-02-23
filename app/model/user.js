/**
* User Model
*/
var _  = require('underscore')
var database = require('../../config/config');

var _db = database.Db('PodCastor');

var cacheUser = {};

function all(){
  return _db.where({type:'User'});
};

function findByUID(id){
  return _.find(this.all(),{uid:id});
};

function findByAuth(id){
  console.log(this.all());
    return _.find(this.all(), {authId:id});
};

function add(user){
  _db.push(user);
  database.Db.save();
  return;
};

module.exports = {
  all:all,
  add:add,
  findByUID:findByUID,
  findByAuth:findByAuth
};
