const assert = require('assert');
const Gistia = require('./../gistia');
const g = new Gistia();

describe('Gistia#flatten', function(){
  it('rejects non-object input', function(){
    assert.throws(function(){
      g.flatten('I am a string');
    }, TypeError, /Input must be an object/ );
  });

  it('flattens nested objects', function(){
    let object = { a: 1, b: { c: 2, d: 3 }};
    let expected = { a: 1, 'b.c': 2, 'b.d': 3 };

    assert.deepEqual(g.flatten(object), expected);
  });

  it('flattens arrays correctly', function(){
    let object = { a: 1, b: [ {c: 2}, {c: 3} ]};
    let expected = { a: 1, 'b.0.c': 2, 'b.1.c': 3 };

    assert.deepEqual(g.flatten(object), expected);
  });

  it('leaves non-nested objects', function(){
    let object = { a: 1, b: 2, c: 3, d: 4};

    assert.deepEqual(g.flatten(object), object);
  });

  it('keeps original structure when flattened then unflattened', function() {
    let object = { a: 1, b: { c: { d: 2, e: { f: 3 }}}};

    assert.deepEqual(g.unflatten(g.flatten(object)), object);
  });
});
