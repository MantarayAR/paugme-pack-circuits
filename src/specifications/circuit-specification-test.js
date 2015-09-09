var Class = require('../../framework/class/class');
var Specification = require('../../framework/specifications/specification');

/**
 * Test a given circuit
 *
 * A circuit specification test consists
 * of one or more sequential tick tests
 */
module.exports = function CircuitSpecificationTest( tickTests ) {
  this.Class.extend( Specification, this );
  this.tickTests = tickTests;

  this.isSatisfiedBy = function( circuit ) {
    var passesSpec = true;

    for ( var i = 0; i < this.tickTests.length; i++ ) {
      var tickTest = this.tickTests[i];

      passesSpec = tickTest.isSatisfiedBy( circuit );

      if ( ! passesSpec ) {
        break;
      }

      circuit.tick();
    }

    return passesSpec;
  }
};