var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var NandGate                = require('../../src/circuit-components/nand-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('a nand gate', function () {
  var trueMock;
  var falseMock;

  beforeEach(function () {
    trueMock  = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var nandGate = new NandGate();
    expect( nandGate ).hasNoAbstractMethods();
  });

  it('returns true when no inputs are given', function () {
    var nandGate = new NandGate();
    expect( nandGate.calculate() ).toEqual( 5 );
  });

  it('returns expected results according to its truth table', function () {
    var nandGate = new NandGate();
    nandGate.addInput( falseMock );
    nandGate.addInput( falseMock );
    expect( nandGate.calculate() ).toEqual( 5 );

    nandGate = new NandGate();
    nandGate.addInput( falseMock );
    nandGate.addInput( trueMock );
    expect( nandGate.calculate() ).toEqual( 5 );

    nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( falseMock );
    expect( nandGate.calculate() ).toEqual( 5 );

    nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    expect( nandGate.calculate() ).toEqual( 0 );
  });

  it('can handle many inputs', function () {
    var nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( falseMock );
    nandGate.addInput( trueMock );
    nandGate.addInput( falseMock );
    nandGate.addInput( trueMock );
    expect( nandGate.calculate() ).toEqual( 5 );

    nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    expect( nandGate.calculate() ).toEqual( 0 );
  });

  it('returns true after resetting', function () {
    var nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    nandGate.reset();
    expect( nandGate.calculate() ).toEqual( 5 );
  });

  it('returns true after removing inputs', function () {
    var nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    nandGate.addInput( falseMock );
    nandGate.addInput( falseMock );
    nandGate.removeInput( 0 );
    expect( nandGate.calculate() ).toEqual( 5 );
  });

  it('returns false after removing inputs', function () {
    var nandGate = new NandGate();
    nandGate.addInput( trueMock );
    nandGate.addInput( trueMock );
    nandGate.addInput( falseMock );
    nandGate.removeInput( 2 );
    expect( nandGate.calculate() ).toEqual( 0 );
  });
});