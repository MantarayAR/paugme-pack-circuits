var Class = require('../../framework/class/class');
var Specification = require('../../framework/specifications/specification');
var Ground = require('../circuit-components/active-components/ground');
var OneTerminalVoltageSource = require('../circuit-components/active-components/one-terminal-voltage-source');

module.exports = function CircuitSpecification() {
  this.Class.extend( Specification, this );

  var mapping;
  var DELIMITER = '=>';
  var SEPARATOR = ',';

  function trim( s ) {
    return s.trim();
  };

  function parseLabels( row ) {
    var split = row.split( DELIMITER ).map(trim);

    var inputs = split[0];
    var outputs = split[1];
    mapping.inputLabels = inputs.split( SEPARATOR ).map( trim );
    mapping.outputLabels = outputs.split( SEPARATOR ).map( trim );
  };

  function parseTests( rows ) {
    for ( var i = 0; i < rows.length; i++ ) {
      var row = rows[i];
      var split = row.split( DELIMITER ).map(trim);
      var inputs = split[0];
      var outputs = split[1];

      mapping.tests.push({
        inputs: inputs.split( SEPARATOR ).map( trim ),
        outputs: outputs.split( SEPARATOR ).map( trim )
      });
    }
  };

  function parseTable( data ) {
    // data[0] is the functional mapping
    // each entry after that is a value map

    mapping = {
      inputLabels : [],
      outputLabels : [],
      tests : []
    };

    if ( data.length > 0 ) {
      parseLabels( data[0] );
      parseTests( data.slice( 1 ) );
    }
  };

  this.setTable = function () {
    var args =  Array.prototype.slice.call( arguments );
    parseTable( args );
  }

  this.isSatisfiedBy = function ( circuit ) {
    var meetsSpec = true;
    var cleanUp = {
      inputs : {},
      outputs : {}
    };

    // For each entry, map the values to the
    // labels that match the functional mapping
    mapping:
    for ( var i = 0; i < mapping.tests.length && meetsSpec; i++ ) {
      var test = mapping.tests[ i ];

      for ( var inputIndex = 0; inputIndex < test.inputs.length; inputIndex++ ) {
        var inputValue = test.inputs[ inputIndex ];
        var inputLabel = mapping.inputLabels[ inputIndex ];
        var component = new Ground();

        if ( inputValue === '1' ) {
          component = new OneTerminalVoltageSource();
        }

        circuit.connect( component ).toInput( inputLabel );
        cleanUp.inputs[ inputLabel ] = component;
      }

      for ( var outputIndex = 0; outputIndex < test.outputs.length; outputIndex++ ) {
        var outputValue = test.outputs[ outputIndex ];
        var outputLabel = mapping.outputLabels[ outputIndex ];
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
          meetsSpec = false;
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

      circuit.tick();
    }

    return meetsSpec;
  }
};
