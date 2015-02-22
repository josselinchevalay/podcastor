/**
* User Model
*/
var _  = require('underscore')
var db = require('../../config/config').Db('PodCastor');

var cacheUser = {};

function all(){
  return db.where({type:'User'});
};

function findByUID(uid){
  return _.find(this.all(),function(user){
    return user.uid == uid;
  });
};

function findByAuth(id){
    return _.find(this.all(), function(user){
      return  user.authId == id;
    });
};

function add(user){
  db.push(user);
  db.save();
  return;
};

module.exports = {
  all:all,
  add:add,
  findByUID:findByUID,
  findByAuth:findByAuth
};
