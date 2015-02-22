/**
*
*/
var _   = require('underscore')
var db  = require('../../config/config').Db('PodCastor');

function all(){
  return db.where({type: 'Fm'});
};

function add(fm){
  db.push(fm);
  db.save();
  return;
};

function findById(id){
  return _.find(this.all(), {uid:id});
};

module.exports = {
  all:all,
  add:add,
  findById:findById
};
