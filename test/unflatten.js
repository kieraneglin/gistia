const assert = require('assert');
const Gistia = require('./../gistia');
const g = new Gistia();

describe('Gistia#unflatten', function() {
  it('rejects non-object input', function() {
    assert.throws(function(){
      g.unflatten('I am a string');
    }, TypeError, /Input must be an object/ );
  });

  it('unflattens previously nested objects', function() {
    let object = { a: 1, 'b.c': 2, 'b.d': 3 };
    let expected = { a: 1, b: { c: 2, d: 3 }};

    assert.deepEqual(g.unflatten(object), expected);
  });

  it('unflattens previously deeply nested objects', function() {
    let object = { a: 1, 'b.c.d': 2, 'b.c.e.f': 3 };
    let expected = { a: 1, b: { c: { d: 2, e: { f: 3 }}}};

    assert.deepEqual(g.unflatten(object), expected);
  });

  it('handles arrays per example instructions', function() {
    let object = { a: 1, 'b.0.c': 2, 'b.1.c': 3 };
    let expected = { a: 1, b: [ {c: 2}, {c: 3} ]};

    assert.deepEqual(g.unflatten(object), expected);
  });

  it('leaves nested objects', function() {
    let object = { a: 1, b: { c: 2, d: 3 }};

    assert.deepEqual(g.unflatten(object), object);
  });

  it('keeps original structure when unflattened then flattened', function() {
    let object = { a: 1, 'b.c.d': 2, 'b.c.e.f': 3 };

    assert.deepEqual(g.flatten(g.unflatten(object)), object);
  });
});
