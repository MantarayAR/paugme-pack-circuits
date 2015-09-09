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

  /**
   * What ACTUALLY happens is that the ground
   * should drop to 0 voltage (by virtue of being
   * a circuit).
   *
   * What we are doing here though is determining the
   * output of a circuit by looking at the ground
   *
   * In this app, the ground is really a "Logic Out"
   */
  it('passes the max voltage passed through it', function () {
    var ground = new Ground();
    ground.addInput( falseMock );
    ground.addInput( trueMock );

    expect( ground.calculate() ).toEqual( 5 );
  });

});
