var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var XorGate                 = require('../../src/circuit-components/logic-components/xor-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('a xor gate', function () {
  var trueMock;
  var falseMock;

  beforeEach(function() {
    trueMock  = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var xorGate = new XorGate();
    expect( xorGate ).hasNoAbstractMethods();
  });

  it('returns true when no inputs given', function () {
    var xorGate = new XorGate();
    expect( xorGate.calculate() ).toEqual( 5 ); 
  });

  it('returns values expected by its truth table', function () {
    var xorGate = new XorGate();
    xorGate.addInput( falseMock );
    xorGate.addInput( falseMock );
    expect( xorGate.calculate() ).toEqual( 5 );

    xorGate = new XorGate();
    xorGate.addInput( trueMock );
    xorGate.addInput( falseMock );
    expect( xorGate.calculate() ).toEqual( 0 );

    xorGate = new XorGate();
    xorGate.addInput( falseMock );
    xorGate.addInput( trueMock );
    expect( xorGate.calculate() ).toEqual( 0 );

    xorGate = new XorGate();
    xorGate.addInput( trueMock );
    xorGate.addInput( trueMock );
    expect( xorGate.calculate() ).toEqual( 5 );
  });

  it('returns true when many inputs given', function () {
    var xorGate = new XorGate();

    xorGate.addInput( falseMock );
    xorGate.addInput( falseMock );
    xorGate.addInput( falseMock );
    xorGate.addInput( falseMock );

    expect( xorGate.calculate() ).toEqual( 5 );
  });

  it('returns false when many inputs given', function () {
    var xorGate = new XorGate();

    xorGate.addInput( falseMock );
    xorGate.addInput( falseMock );
    xorGate.addInput( trueMock );

    expect( xorGate.calculate() ).toEqual( 0 );
  });

  it('returns true after resetting', function () {
    var xorGate = new XorGate();

    xorGate.addInput( trueMock );
    xorGate.addInput( trueMock );

    xorGate.reset();

    expect( xorGate.calculate() ).toEqual( 5 );
  });

  it('returns true after removing inputs', function () {
    var xorGate = new XorGate();

    xorGate.addInput( trueMock );
    xorGate.addInput( falseMock );
    xorGate.addInput( falseMock );

    xorGate.removeInput( 0 );

    expect( xorGate.calculate() ).toEqual( 5 );
  });

  it('returns false after removing inputs', function () {
    var xorGate = new XorGate();

    xorGate.addInput( trueMock );
    xorGate.addInput( trueMock );
    xorGate.addInput( falseMock );

    xorGate.removeInput( 0 );

    expect( xorGate.calculate() ).toEqual( 0 );
  });
});
