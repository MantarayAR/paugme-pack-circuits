
_unitTests = [];

function isAUnitTest() {
  this.setup    = function () {};
  this.teardown = function () {};

  this.assertValueEqualsExpected = function ( observed, expected, message ) {
    if ( observed !== expected ) {
      console.log( message );
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

          if ( ! good ) {
            console.log( 'F' );
          }

          console.log( '.' );
        }
      }
    }

    test.teardown();
  }
}