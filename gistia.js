'use strict';
/** @Gistia */

class Gistia {
  /**
   * Turn multileveled Object into one-level period-delimited keys with associated values
   * @example
   * let obj = { a:1, b: { c:2, d:3 } };
   * flatten(obj);
   * @param {object} obj The Object to flatten
   * @param {array} [prefix=[]] The stack of already-processed keys.
   * @param {object} [flattenedObject={}] The Object returned by the recursive function to be passed to the next level of recursion
   * @returns {object} The flattened Object
   */
  flatten(obj, prefix = [], flattenedObject = {}) {
    if (typeof (obj) !== 'object') {
      throw new TypeError('Input must be an object');
    }

    for (let prop in obj) {
      let formattedPrefix = prefix.concat(prop).join('.');

      if (obj.hasOwnProperty(prop)) {
        if (typeof obj[prop] == "object") {
          // In example provided, empty array returns null.
          // Default behavior would omit the key entirely.
          // With this, they key ends up the final array with a value of null.
          if (Object.keys(obj[prop]).length === 0) {
            flattenedObject[formattedPrefix] = null;
          }

          this.flatten(obj[prop], prefix.concat(prop), flattenedObject);
        } else {
          flattenedObject[formattedPrefix] = obj[prop];
        }
      }
    }

    return flattenedObject;
  }

  /**
   * Turn flattened Object into an expanded, nested object
   * @example
   * let obj = { a:1, 'b.c':2, 'b.d': 3 };
   * unflatten(obj);
   * @param {object} obj The Object to expand
   * @returns {object} The unflattened Object
   */
  unflatten(obj) {
    if (typeof (obj) !== 'object') {
      throw new TypeError('Input must be an object');
    }

    let nestedObj = {};

    for (let prop in obj) {
      // We need a reference for the output object or it'll only return the last element
      let nested = nestedObj;
      let path = prop.split('.');
      // Since the last key will then be assigned to a value, it has to be a separate operation
      let lastKeyIndex = path.length - 1;

      for (let i = 0; i < lastKeyIndex; i++) {
        let key = path[i];
        if (!(key in nested)) {
          // If the key is a number, it becomes an array.
          // This is so that 'a.b.1.c' is interpreted with arrays instead of objects with indexed keys
          // This was done per the instructions given
          nested[key] = isFinite(path[i + 1]) ? [] : {};
        }
        nested = nested[key];
      }
      nested[path[lastKeyIndex]] = obj[prop];
    }

    return nestedObj;
  }
}

module.exports = Gistia;
