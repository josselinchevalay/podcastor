var model = require('../app/model/fm')


exports.testAdd = function(test) {
  var value = {
    type: 'Fm',
    name: ''
  };
  model.add(value);
  test.done();
};
