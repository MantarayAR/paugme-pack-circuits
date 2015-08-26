var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var Switch                  = require('../../src/circuit-components/passive-components/switch');
var AbstractMatcher         = require('../matchers/abstract-matcher');

describe('the switch', function () {
  var trueMock;
  var falseMock;

  beforeEach(function () {
    trueMock = new TrueLogicMockComponent();
    falseMock = new FalseLogicMockComponent();
    jasmine.addMatchers( AbstractMatcher );
  });

  it('has no abstract mathods', function () {
    var switchComp = new Switch();

    expect(switchComp).hasNoAbstractMethods();
  });

  it('passes voltage', function () {
    var switchComp = new Switch();
    switchComp.addInput( trueMock );
    switchComp.turnOn();
    expect( switchComp.calculate() ).toEqual( 5 );

    switchComp = new Switch();
    switchComp.addInput( falseMock );
    switchComp.turnOn();
    expect( switchComp.calculate() ).toEqual( 0 );
  });

  it('does not pass voltage', function () {
    var switchComp = new Switch();
    switchComp.addInput( trueMock );
    switchComp.turnOff();
    expect( switchComp.calculate() ).toEqual( 0 );

    switchComp = new Switch();
    switchComp.addInput( falseMock );
    switchComp.turnOff();
    expect( switchComp.calculate() ).toEqual( 0 );
  });

});
