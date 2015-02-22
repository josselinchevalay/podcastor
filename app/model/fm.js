/**
*
*/
var _   = require('underscore')
var db  = require('../../config/config').Db('PodCastor');

function all(){
  return db.where({Type: 'Fm'}).value();
};

function add(fm){
  db.push(fm);
  db.save();
  return;
};

module.exports = {
  add:add
};
