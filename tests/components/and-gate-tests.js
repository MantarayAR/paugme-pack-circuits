var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var AndGate                 = require('../../src/circuit-components/and-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('an and gate', function() {
  var trueMock;
  var falseMock;

  beforeEach(function() {
    trueMock  = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var andGate = new AndGate();
    expect( andGate ).hasNoAbstractMethods();
  });

  it('returns true when no inputs are given', function () {
    var andGate = new AndGate();
    expect( andGate.calculate() ).toEqual( 5 );
  });

  it('returns true', function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( trueMock );

    expect( andGate.calculate() ).toEqual( 5 );
  });

  it('returns true when given many inputs', function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( trueMock );
    andGate.addInput( trueMock );
    andGate.addInput( trueMock );

    expect( andGate.calculate() ).toEqual( 5 );
  });

  it('returns false', function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( falseMock );

    expect( andGate.calculate() ).toEqual( 0 );
  });

  it('returns true when reset', function () {
    var andGate = new AndGate();

    andGate.addInput( falseMock );
    andGate.addInput( falseMock );

    andGate.reset();

    expect( andGate.calculate() ).toEqual( 5 );
  });

  it('returns true when removing inputs', function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( falseMock );

    andGate.removeInput( 1 );

    expect( andGate.calculate() ).toEqual( 5 );
  });

  it('returns false when removing inputs', function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( falseMock );

    andGate.removeInput( 0 );

    expect( andGate.calculate() ).toEqual( 0 );
  });

});
