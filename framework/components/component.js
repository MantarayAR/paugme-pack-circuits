var Class = require('../class/class.js');

module.exports = function Component() {
  this.inputs = [];
  this.calculate       = Class.abstractMethod;
  this.wasCalculated   = false;
  this.currentCalculation = false;
  this.lastCalculation = 0;

  this.addInput = function ( component ) {
    this.inputs.push( component );

    return this.inputs.length - 1;
  }

  this.removeInput = function ( index ) {
    this.inputs.splice( index, 1 );
  }

  this.reset = function () {
    this.inputs = [];
  }

  this.tick = function () {
    this.wasCalculated      = false;
    this.lastCalculation    = this.currentCalculation;
    this.currentCalculation = false;
  }

  this.run = function () {
    if ( this.wasCalculated ) {

      if ( this.currentCalculation === false ) {
        return this.lastCalculation;
      }

      return this.currentCalculation;
    }

    this.wasCalculated = true;

    var value = this.calculate();

    this.currentCalculation = value;

    return value;
  }
};
