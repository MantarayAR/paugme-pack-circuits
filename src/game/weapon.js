var Item  = require('./item');
var Class = require('../../framework/class/class');

module.exports = function Weapon() {
  this.Class.extend( Item, this );
  this.name = 'weapon';
  this.enabled = false;

  this.enable = function () {
    this.enabled = true;
  };

  this.disable = function () {
    this.enabled = false;
  };

  this.getSpecification = Class.abstractMethod;
};