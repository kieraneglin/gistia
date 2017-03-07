'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gistia = function () {
  function Gistia() {
    _classCallCheck(this, Gistia);
  }

  _createClass(Gistia, [{
    key: 'flatten',

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
    value: function flatten(obj) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var flattenedObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        throw new TypeError('Input must be an object');
      }

      for (var prop in obj) {
        var formattedPrefix = prefix.concat(prop).join('.');

        if (obj.hasOwnProperty(prop)) {
          if (_typeof(obj[prop]) == "object") {
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

  }, {
    key: 'unflatten',
    value: function unflatten(obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        throw new TypeError('Input must be an object');
      }

      var nestedObj = {};

      for (var prop in obj) {
        // We need a reference for the output object or it'll only return the last element
        var nested = nestedObj;
        var path = prop.split('.');
        // Since the last key will then be assigned to a value, it has to be a separate operation
        var lastKeyIndex = path.length - 1;

        for (var i = 0; i < lastKeyIndex; i++) {
          var key = path[i];
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
  }]);

  return Gistia;
}();
