
Class = {};

Class.abstractMethod = function () {
  throw new NotImplementedException();
}

/**
 * To extend this class using
 * the given object, we must set
 * all the prototypes and functions
 */
Class.extend = function ( obj, that ) {
  var o = new obj();
  for ( var property in o ) {
    that[property] = o[property];
  }
}

Class.implement = function ( obj, that ) {
  var o = new obj();
  for ( var property in o ) {
    if ( typeof o[property] === 'function' ) {
      that[property] = Class.abstractMethod;
    } else {
      that[property] = o[property];
    }
  }
}

Object.prototype.Class = Class;