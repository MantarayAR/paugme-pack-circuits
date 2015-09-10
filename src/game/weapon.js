var Item  = require('./item');
var Class = require('../../framework/class/class');

module.exports = function Weapon() {
  this.Class.extend( Item, this );
  this.name = 'weapon';

  this.enable = function () {
    // TODO
  };

  this.disable = function () {
    // TODO
  };

  this.getSpecification = Class.abstractMethod;
};