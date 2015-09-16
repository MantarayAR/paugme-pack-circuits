var Map = require('./map');
var Class = require('../../../framework/class/class');

/**
 * @class Simple empty rectangular room
 * @augments ROT.Map
 */
Arena = function(width, height) {
  Class.extend( Map, this );
  Map.call(this, width, height);
}

Arena.prototype.create = function(callback) {
  var w = this._width-1;
  var h = this._height-1;
  for (var i=0;i<=w;i++) {
    for (var j=0;j<=h;j++) {
      var empty = (i && j && i<w && j<h);
      callback(i, j, empty ? 0 : 1);
    }
  }
  return this;
}

module.exports = Arena;