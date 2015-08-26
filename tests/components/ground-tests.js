var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var Ground                  = require('../../src/circuit-components/active-components/ground');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('the ground', function () {
  var trueMock;
  var falseMock;

  beforeEach(function () {
    trueMock = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract mathods', function () {
    var ground = new Ground();

    expect(ground).hasNoAbstractMethods();
  });

  it('passes voltage', function () {
    var ground = new Ground();
    ground.addInput( trueMock );
    expect( ground.calculate() ).toEqual( 5 );

    ground = new Ground();
    ground.addInput( falseMock );
    expect( ground.calculate() ).toEqual( 0 );
  });

  // TODO is this physically correct?
  it('passes the max voltage passed through it', function () {
    var ground = new Ground();
    ground.addInput( falseMock );
    ground.addInput( trueMock );

    expect( ground.calculate() ).toEqual( 5 );
  });

});
