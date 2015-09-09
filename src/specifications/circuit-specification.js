var Class = require('../../framework/class/class');
var Specification = require('../../framework/specifications/specification');
var CircuitSpecificationTestFactory = require('../factories/circuit-specification-test-factory');

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
