var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var XnorGate                 = require('../../src/circuit-components/logic-components/xnor-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('a xnor gate', function () {
  var trueMock;
  var falseMock;
  var xnorGate;

  beforeEach(function () {
    trueMock = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    xnorGate = new XnorGate();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    expect( xnorGate ).hasNoAbstractMethods();
  });

  it('returns true when no inputs given', function () {
    expect( xnorGate.calculate() ).toEqual( 5 );
  });

  it('returns values expected by its truth table', function () {
    xnorGate = new XnorGate();
    xnorGate.addInput( falseMock );
    xnorGate.addInput( falseMock );
    expect( xnorGate.calculate() ).toEqual( 5 );

    xnorGate = new XnorGate();
    xnorGate.addInput( trueMock );
    xnorGate.addInput( falseMock );
    expect( xnorGate.calculate() ).toEqual( 0 );

    xnorGate = new XnorGate();
    xnorGate.addInput( falseMock );
    xnorGate.addInput( trueMock );
    expect( xnorGate.calculate() ).toEqual( 0 );

    xnorGate = new XnorGate();
    xnorGate.addInput( trueMock );
    xnorGate.addInput( trueMock );
    expect( xnorGate.calculate() ).toEqual( 5 );
  });

  it('returns true when many inputs given', function () {
    xnorGate.addInput( falseMock );
    xnorGate.addInput( falseMock );
    xnorGate.addInput( falseMock );
    xnorGate.addInput( falseMock );

    expect( xnorGate.calculate() ).toEqual( 5 );
  });

  it('returns false when many inputs given', function () {
    xnorGate.addInput( falseMock );
    xnorGate.addInput( falseMock );
    xnorGate.addInput( trueMock );

    expect( xnorGate.calculate() ).toEqual( 0 );
  });

  it('returns true after resetting', function () {
    xnorGate.addInput( trueMock );
    xnorGate.addInput( trueMock );

    xnorGate.reset();

    expect( xnorGate.calculate() ).toEqual( 5 );
  });

  it('returns true after removing inputs', function () {
    xnorGate.addInput( trueMock );
    xnorGate.addInput( falseMock );
    xnorGate.addInput( falseMock );

    xnorGate.removeInput( 0 );

    expect( xnorGate.calculate() ).toEqual( 5 );
  });

  it('returns false after removing inputs', function () {
    xnorGate.addInput( trueMock );
    xnorGate.addInput( trueMock );
    xnorGate.addInput( falseMock );

    xnorGate.removeInput( 0 );

    expect( xnorGate.calculate() ).toEqual( 0 );
  });
});
