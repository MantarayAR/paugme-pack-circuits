_unitTests = [];
_unitTestsResults = [];
_unitTestsMessages = [];

function unitTestWriter() {}
unitTestWriter.addResult = function( result ) {
  _unitTestsResults.push( result );
}
unitTestWriter.addMessage = function( observed, expected, message, data ) {
  _unitTestsMessages.push( {
      observed : observed,
      expected : expected,
      message : message,
      data : data
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

  if ( _unitTestsMessages.length > 0 ) {
    for ( var i = 0; i < _unitTestsMessages.length; i++ ) {
      var result = _unitTestsMessages[i];
      console.log( result.message + ' Expected ' + result.expected + ' got ' + result.observed );

      if ( result.data !== '' ) {
        console.log( result.data );
      }
    }  
  } else {
    console.log( 'All tests passed!' );
  }
}

function isAUnitTest() {
  this.setup    = function () {};
  this.teardown = function () {};

  this.assertValueEqualsExpected = function ( observed, expected, message, data ) {
    if ( observed !== expected ) {
      message = message ? message : '';
      data    = data ? data : '';
      unitTestWriter.addMessage( observed, expected, message, data );
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

  // Clean up
  _unitTests = [];
  _unitTestsMessages = [];
  _unitTestsResults = [];
}