var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var OrGate                  = require('../../src/circuit-components/or-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('an or gate', function () {
  var trueMock;
  var falseMock;

  beforeEach(function() {
    trueMock  = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var orGate = new OrGate();
    expect( orGate ).hasNoAbstractMethods();
  });

  it('returns false when no inputs given', function () {
    var orGate = new OrGate();
    expect( orGate.calculate() ).toEqual( 0 ); 
  });

  it('returns true', function () {
    var orGate = new OrGate();
    orGate.addInput( trueMock );
    orGate.addInput( falseMock );

    expect( orGate.calculate() ).toEqual( 5 );
  });

  it('returns true when many inputs given', function () {
    var orGate = new OrGate();

    orGate.addInput( falseMock );
    orGate.addInput( falseMock );
    orGate.addInput( falseMock );
    orGate.addInput( trueMock );
    orGate.addInput( falseMock );

    expect( orGate.calculate() ).toEqual( 5 );
  });

  it('returns false', function () {
    var orGate = new OrGate();

    orGate.addInput( falseMock );
    orGate.addInput( falseMock );

    expect( orGate.calculate() ).toEqual( 0 );
  });

  it('returns false after resetting', function () {
    var orGate = new OrGate();

    orGate.addInput( trueMock );
    orGate.addInput( trueMock );

    orGate.reset();

    expect( orGate.calculate() ).toEqual( 0 );
  });

  it('returns true after removing inputs', function () {
    var orGate = new OrGate();

    orGate.addInput( trueMock );
    orGate.addInput( falseMock );

    orGate.removeInput( 1 );

    expect( orGate.calculate() ).toEqual( 5 );
  });

  it('returns false after removing inputs', function () {
    var orGate = new OrGate();

    orGate.addInput( trueMock );
    orGate.addInput( falseMock );

    orGate.removeInput( 0 );

    expect( orGate.calculate() ).toEqual( 0 );
  });
});
