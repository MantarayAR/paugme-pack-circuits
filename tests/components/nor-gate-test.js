var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var NorGate                 = require('../../src/circuit-components/logic-components/nor-gate');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('a nor gate', function () {
  var trueMock;
  var falseMock;

  beforeEach(function() {
    trueMock  = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract methods', function () {
    var norGate = new NorGate();
    expect( norGate ).hasNoAbstractMethods();
  });

  it('returns true when no inputs given', function () {
    var norGate = new NorGate();
    expect( norGate.calculate() ).toEqual( 5 ); 
  });

  it('returns values expected by its truth table', function () {
    var norGate = new NorGate();
    norGate.addInput( falseMock );
    norGate.addInput( falseMock );
    expect( norGate.calculate() ).toEqual( 5 );

    norGate = new NorGate();
    norGate.addInput( trueMock );
    norGate.addInput( falseMock );
    expect( norGate.calculate() ).toEqual( 0 );

    norGate = new NorGate();
    norGate.addInput( falseMock );
    norGate.addInput( trueMock );
    expect( norGate.calculate() ).toEqual( 0 );

    norGate = new NorGate();
    norGate.addInput( trueMock );
    norGate.addInput( trueMock );
    expect( norGate.calculate() ).toEqual( 0 );
  });

  it('returns true when many inputs given', function () {
    var norGate = new NorGate();

    norGate.addInput( falseMock );
    norGate.addInput( falseMock );
    norGate.addInput( falseMock );
    norGate.addInput( falseMock );

    expect( norGate.calculate() ).toEqual( 5 );
  });

  it('returns false when many inputs given', function () {
    var norGate = new NorGate();

    norGate.addInput( falseMock );
    norGate.addInput( falseMock );
    norGate.addInput( trueMock );

    expect( norGate.calculate() ).toEqual( 0 );
  });

  it('returns true after resetting', function () {
    var norGate = new NorGate();

    norGate.addInput( trueMock );
    norGate.addInput( trueMock );

    norGate.reset();

    expect( norGate.calculate() ).toEqual( 5 );
  });

  it('returns true after removing inputs', function () {
    var norGate = new NorGate();

    norGate.addInput( trueMock );
    norGate.addInput( falseMock );
    norGate.addInput( falseMock );

    norGate.removeInput( 0 );

    expect( norGate.calculate() ).toEqual( 5 );
  });

  it('returns false after removing inputs', function () {
    var norGate = new NorGate();

    norGate.addInput( trueMock );
    norGate.addInput( trueMock );
    norGate.addInput( falseMock );

    norGate.removeInput( 0 );

    expect( norGate.calculate() ).toEqual( 0 );
  });
});
