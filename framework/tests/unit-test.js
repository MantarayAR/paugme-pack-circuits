_unitTests = [];
_unitTestsResults = [];
_unitTestsMessages = [];

function unitTestWriter() {}
unitTestWriter.addResult = function( result ) {
  _unitTestsResults.push( result );
}
unitTestWriter.addMessage = function( observed, expected, message ) {
  _unitTestsMessages.push( {
      observed : observed,
      expected : expected,
      message : message
  } );
}
unitTestWriter.print = function () {
  var buffer = '';
  var iteration = 0;
  for ( var i = 0; i < _unitTestsResults.length; i++ ) {
    iteration++;
    buffer += _unitTestsResults[i];

    if ( iteration > 10 ) {
      console.log( buffer );  
      iteration = 0;
      buffer = '';
    }
  }

  if ( buffer !== '' ) {
    console.log( buffer );  
  }

  for ( var i = 0; i < _unitTestsResults.length; i++ ) {
    var result = _unitTestsMessages[i];
    console.log( result.message + ' Expected ' + result.expected + ' got ' + result.observed );
  }
}

function isAUnitTest() {
  this.setup    = function () {};
  this.teardown = function () {};

  this.assertValueEqualsExpected = function ( observed, expected, message ) {
    if ( observed !== expected ) {
      unitTestWriter.addMessage( observed, expected, message );
      return -1;
    }
  }

  _unitTests.push( this );
}

function runUnitTests() {
  for ( var i = 0; i < _unitTests.length; i++ ) {
    var test = _unitTests[i];

    test.setup();

    for ( var part in test ) {
      if ( test.hasOwnProperty( part ) ) {
        if ( typeof test[part] === 'function' && 
             part.indexOf('test') === 0 ) {
          var good = test[part]();

          if ( good === false ) {
            unitTestWriter.addResult( 'F' );
          } else {
            unitTestWriter.addResult( '.' );  
          }
        }
      }
    }

    test.teardown();
  }

  unitTestWriter.print();
}