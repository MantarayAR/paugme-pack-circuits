var Class     = require('../../../framework/class/class.js');
var Component = require('../../../framework/components/component.js');
var Gate      = require('../../../framework/components/gate.js');

module.exports = function Switch() {
  Class.extend( Component, this );
  Class.implement( Gate, this );

  this.state = false;

  this.turnOn = function () {
    this.state = true;
  }

  this.turnOff = function () {
    this.state = false;
  }

  this.toggle = function () {
    this.state = ! this.state;
  }

  this.calculate = function () {
    if ( this.state ) {
      var results = [];
      for ( var i = 0; i < this.inputs.length; i++ ) {
        results.push( this.inputs[i].run() );
      }
      return results[0];
    } else {
      return this.FALSE_VOLTAGE;
    }
  }
}