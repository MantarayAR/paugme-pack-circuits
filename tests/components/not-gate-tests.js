var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var NotGate                 = require('../../src/circuit-components/not-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('a not gate', function () {
  var trueMock;
  var falseMock;

  beforeEach(function() {
    trueMock  = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var notGate = new NotGate();
    expect( notGate ).hasNoAbstractMethods();
  });

  it('returns true when no inputs are given', function () {
    var notGate = new NotGate();

    expect( notGate.calculate() ).toEqual( 5 );
  });

  it('returns true', function () {
    var notGate = new NotGate();

    notGate.addInput( falseMock );

    expect( notGate.calculate() ).toEqual( 5 );
  });

  it('returns false', function () {
    var notGate = new NotGate();

    notGate.addInput( trueMock );

    expect( notGate.calculate() ).toEqual( 0 );
  });

  it('returns true after reset', function () {
    var notGate = new NotGate();
    notGate.addInput( trueMock );
    notGate.reset();

    expect( notGate.calculate() ).toEqual( 5 );
  });

  it('returns true after removing an input', function () {
    var notGate = new NotGate();
    notGate.addInput( trueMock );
    notGate.removeInput( 0 );

    expect( notGate.calculate() ).toEqual( 5 );
  });

  it('is not affected by secondary inputs', function () {
     var notGate = new NotGate();

    notGate.addInput( trueMock );
    notGate.addInput( falseMock );

    expect( notGate.calculate() ).toEqual( 0 );

    notGate = new NotGate();

    notGate.addInput( trueMock );
    notGate.addInput( trueMock );

    expect( notGate.calculate() ).toEqual( 0 );
  });
});
