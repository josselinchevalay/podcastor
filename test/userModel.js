var UserModel = require('../app/model/user');


exports.testAddUser = function(test) {
  if (UserModel.findByAuth('123')) {
    test.done();
    return;
  }
  var value = {
    uid: '6a609d39-0733-4c15-9c38-66049f1e8a12',
    pseudo: 'mike@toto.com',
    authId: '123',
    type: 'User',
    fm: []
  };
  UserModel.add(value);
  test.done();
}


exports.testByUID = function(test) {
  var usr = UserModel.findByUID('6a609d39-0733-4c15-9c38-66049f1e8a12');
  test.done(test.equal(usr.pseudo, 'mike@toto.com'));
};


exports.testFindByAuth = function(test) {
  var usr = UserModel.findByAuth('123');
  test.done(test.equal(usr.pseudo, 'mike@toto.com'));
};


exports.testAllUser = function(test) {
  var length = UserModel.all().length;
  test.done(test.equal(length, 1));
};
