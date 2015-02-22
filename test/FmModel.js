var model = require('../app/model/fm')


exports.testAdd = function(test) {
  var value = {
    uid: '123',
    type: 'Fm',
    name: ''
  };
  if(!model.findById('123'))
  {
    model.add(value);
  }
  test.done();
};

exports.testAll = function(test){
  var length = model.all().length;
  test.equal(length, 1);
  test.done();
};
