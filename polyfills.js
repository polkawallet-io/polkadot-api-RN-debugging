if (!Uint8Array.prototype.fill) {
  const U8aPoly = require('typedarray').Uint8Array;

  U8aPoly.prototype.fill = Array.prototype.fill;
  U8aPoly.prototype.reduce = Array.prototype.reduce;
  U8aPoly.prototype.slice = Array.prototype.slice;
  // U8aPoly.prototype.from = Array.prototype.from;
  // Uint8Array.proptype.from = (value) => new Uint8Array(Array.from(value));

  global.Uint8Array = U8aPoly;
}

if (!Uint8Array.__proto__.from) {
  (function () {
      Uint8Array.__proto__.from = function (obj, func, thisObj) {

          var typedArrayClass = Uint8Array.__proto__;
          if(typeof this !== 'function') {
              throw new TypeError('# is not a constructor');
          }
          if (this.__proto__ !== typedArrayClass) {
              throw new TypeError('this is not a typed array.');
          }

          func = func || function (elem) {
                  return elem;
              };

          if (typeof func !== 'function') {
              throw new TypeError('specified argument is not a function');
          }

          obj = Object(obj);
          if (!obj['length']) {
              return new this(0);
          }
          var copy_data = [];
          for(var i = 0; i < obj.length; i++) {
              copy_data.push(obj[i]);
          }

          copy_data = copy_data.map(func, thisObj);

          var typed_array = new this(copy_data.length);
          for(var i = 0; i < typed_array.length; i++) {
              typed_array[i] = copy_data[i];
          }
          return typed_array;
      }
  })();
}
