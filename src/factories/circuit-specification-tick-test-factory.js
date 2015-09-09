var Class = require('../../framework/class/class');
var Factory = require('../../framework/factories/factory');
var CircuitSpecificationTickTest = require('../specifications/circuit-specification-tick-test');

/**
 * Create a Circuit Specification Tick Test
 */
module.exports = function CircuitSpecificationTickTestFactory() {
  this.Class.extend( Factory, this );
  var inputLabels;
  var outputLabels;
  var inputValues;
  var outputValues;

  this.setInputLabels = function ( labels ) {
    inputLabels = labels;
  }

  this.setOutputLabels = function ( labels ) {
    outputLabels = labels;
  }

  this.setInputValues = function ( expectedValues ) {
    inputValues = expectedValues;
  }

  this.setOutputValues = function ( expectedValues ) {
    outputValues = expectedValues;
  }

  this.build = function () {
    var tickTest = new CircuitSpecificationTickTest(
      inputLabels,
      outputLabels,
      inputValues,
      outputValues
    );

    return tickTest;
  }
};