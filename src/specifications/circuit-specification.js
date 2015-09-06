var Class = require('../../framework/class/class');
var Specification = require('../../framework/specifications/specification');
var Ground = require('../circuit-components/active-components/ground');
var OneTerminalVoltageSource = require('../circuit-components/active-components/one-terminal-voltage-source');
var Factory = require('../../framework/factories/factory');
/**
 * Create a Circuit Specification Tick Test
 */
function CircuitSpecificationTickTestFactory() {
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
}

/**
 * Create Circuit Specification Tests
 */
function CircuitSpecificationTestFactory() {
  this.Class.extend( Factory, this );

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

function CircuitSpecificationTickTest( inputLabels, outputLabels, inputValues, outputValues ) {
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

/**
 * Test a given circuit
 *
 * A circuit specification test consists
 * of one or more sequential tick tests
 */
function CircuitSpecificationTest( tickTests ) {
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

module.exports = function CircuitSpecification() {
  this.Class.extend( Specification, this );

  var tests = [];
  var inputLabels;
  var outputLabels;
  var DELIMITERS = {
    OUTPUT : '=>',
    ARGUMENT: ',',
    TICK: '|',
  };

  /**
   * Trim helper function
   */
  function trim( s ) {
    return s.trim();
  };

  function parseLabels( row ) {
    var split = row.split( DELIMITERS.OUTPUT ).map(trim);

    var inputs = split[0];
    var outputs = split[1];
    inputLabels = inputs.split( DELIMITERS.ARGUMENT ).map( trim );
    outputLabels = outputs.split( DELIMITERS.ARGUMENT ).map( trim );
  };

  function parseTable( data ) {
    for ( var i = 0; i < data.length; i++ ) {
      var row   = data[i];
      var ticks = row.split( DELIMITERS.TICK ).map( trim );

      var factory = new CircuitSpecificationTestFactory();

      for ( var tickIndex = 0; tickIndex < ticks.length; tickIndex++ ) {
        var tick = ticks[tickIndex];
        var tickFactory = factory.getTickFactory();

        tickTest = getTestsFromTick( tick, tickFactory );
        factory.addTick( tickTest );
      }

      var test = factory.build();
      tests.push( test );
    }
  };

  function getTestsFromTick( tick, tickFactory ) {
    var parts = tick.split( DELIMITERS.OUTPUT ).map( trim );
    var inputValues = parts[0].split( DELIMITERS.ARGUMENT ).map( trim );
    var outputValues = parts[1].split( DELIMITERS.ARGUMENT ).map( trim );

    tickFactory.setInputLabels( inputLabels );
    tickFactory.setOutputLabels( outputLabels );
    tickFactory.setInputValues( inputValues );
    tickFactory.setOutputValues( outputValues );
    return tickFactory.build();
  }

  this.setLabels = function ( labelString ) {
    parseLabels( labelString );
  };

  this.setTable = function () {
    var args =  Array.prototype.slice.call( arguments );
    parseTable( args );
  }

  this.isSatisfiedBy = function ( circuit ) {
    var passesSpec = true;

    for ( var i = 0; i < tests.length; i++ ) {
      var test = tests[i];

      passesSpec = test.isSatisfiedBy( circuit );

      if ( ! passesSpec ) {
        break;
      }
    }

    return passesSpec;
  }
};
