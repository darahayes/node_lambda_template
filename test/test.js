const assert = require('assert');
const handler = require('../index').handler;

describe('handler', () => {
  it('should return the key1 value', (done) => {
    var event = {
      'key1': 'hello',
      'key2': 'world'
    };
    handler(event, null, (err, result) => {
      assert.equal(err, null);
      assert.equal(result, 'hello');
      done();
    })
  });
});