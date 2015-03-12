'use strict'

var _ = require('underscore')
var database = require('../../config/config')

var _db = database.Db('PodCastor')

/**
 * hydrate
 * can use for get object by id
 * @param strType  string  name of type
 * @param uid      string  uid of object
 *
 * @return object
 */
function hydrate(strType, uid) {
  return _db.find({
    type: strType,
    uid: uid
  });
}

/**
 * unhydrate
 * can use for get uid for an object
 * @param object object  an instance of object
 *
 * @return string uid
 */
function unHydrate(object) {
  return object.uid;
}

/**
 * lazyload
 * can use for lazy load a table of uid
 * @param strType  string  name of type
 * @param tabUid   array   table of uid to load
 *
 * @return array of object
 */
function lazyLoad(strType, tabUid) {
  return _.map(tabUid, function(uid) {
    return hydrate(strType, uid);
  })
}

/**
 * unLazyLoad
 * can use for un lazy load of object
 * @param tabobject  array
 *
 * @return array of string uid
 */
function unLazyLoad(tabobject) {
  return _.map(tabobject, function(object) {
    return unHydrate(object);
  });
}


module.exports = {
  hydrate: hydrate,
  unhydrate: unHydrate,
  lazyLoad: lazyLoad,
  unLazyLoad: unLazyLoad
};
