var OneTerminalVoltageSource = require('../../../src/circuit-components/active-components/one-terminal-voltage-source');
var AbstractMatcher          = require('../matchers/abstract-matcher');

describe('a one terminal voltage source', function () {
  beforeEach(function() {
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var voltageSource = new OneTerminalVoltageSource();
    expect( voltageSource ).hasNoAbstractMethods();
  });

  it('is five volts', function () {
    var voltageSource = new OneTerminalVoltageSource();
    expect( voltageSource.calculate() ).toEqual( 5 );
  })
});
