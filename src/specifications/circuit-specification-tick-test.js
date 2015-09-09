var Class = require('../../framework/class/class');
var Specification = require('../../framework/specifications/specification');
var Ground = require('../circuit-components/active-components/ground');
var OneTerminalVoltageSource = require('../circuit-components/active-components/one-terminal-voltage-source');

module.exports = function CircuitSpecificationTickTest( inputLabels, outputLabels, inputValues, outputValues ) {
  this.Class.extend( Specification, this );
  this.inputLabels = inputLabels;
  this.outputLabels = outputLabels;
  this.inputValues = inputValues;
  this.outputValues = outputValues;

  this.isSatisfiedBy = function( circuit ) {
    var passesSpec = true;
    var i = 0;
    var cleanUp = {
      inputs : {},
      outputs : {}
    };

    for ( i = 0; i < this.inputValues.length; i++ ) {
      var inputValue = this.inputValues[ i ];
      var inputLabel = this.inputLabels[ i ];
      var component = new Ground();

      if ( inputValue === '1' ) {
        component = new OneTerminalVoltageSource();
      }

      circuit.connect( component ).toInput( inputLabel );
      cleanUp.inputs[ inputLabel ] = component;
    }

    for ( i = 0; i < this.outputValues.length; i++ ) {
      var outputValue = this.outputValues[ i ];
      var outputLabel = this.outputLabels[ i ];
      var ground = new Ground();

      circuit.connect( ground ).toOutput( outputLabel );
      cleanUp.outputs[ outputLabel ] = component;

      var result = ground.run();

      // If any mapping is not correct, fail
      if ( parseInt( outputValue ) === 1 &&
           result === 5 ) {
        // nothing
      } else if ( parseInt( outputValue ) === 0 &&
           result === 0 ) {
        // nothing
      } else if ( outputValue === 'X' ) {
        // nothing
      } else {
        passesSpec = false;
        break;
      }
    }

    // Clean up
    for ( var label in cleanUp.inputs ) {
      if ( cleanUp.inputs.hasOwnProperty( label ) ) {
        circuit.disconnect( cleanUp.inputs[ label ] ).fromInput( label );
      }
    }

    for ( var label in cleanUp.outputs ) {
      if ( cleanUp.outputs.hasOwnProperty( label ) ) {
        circuit.disconnect( cleanUp.outputs[ label ] ).fromInput( label );
      }
    }

    return passesSpec;
  }
}