var Class = require('../../framework/class/class');
var Factory = require('../../framework/factories/factory');
var CircuitSpecificationTickTestFactory = require('../factories/circuit-specification-tick-test-factory');
var CircuitSpecificationTest = require('../specifications/circuit-specification-test');
/**
 * Create Circuit Specification Tests
 */
module.exports = function CircuitSpecificationTestFactory() {
  Class.extend( Factory, this );

  var ticks = [];

  this.getTickFactory = function () {
    return new CircuitSpecificationTickTestFactory();
  }

  this.addTick = function ( tick ) {
    ticks.push( tick );
  }

  this.build = function () {
    var tickTest = new CircuitSpecificationTest(
      ticks
    );

    return tickTest;
  }
}