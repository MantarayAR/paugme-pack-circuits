var MockInputs              = require('../mocks/mock-inputs');
var TrueLogicMockComponent  = MockInputs.TrueLogicMockComponent;
var FalseLogicMockComponent = MockInputs.FalseLogicMockComponent;
var AndGate = require('../../src/circuit-components/logic-components/and-gate');
var OrGate = require('../../src/circuit-components/logic-components/or-gate');
var NorGate = require('../../src/circuit-components/logic-components/nor-gate');
var Ground  = require('../../src/circuit-components/active-components/ground');
var Circuit = require('../../src/composites/circuit');
var Switch  = require('../../src/circuit-components/passive-components/switch');

describe( 'a circuit', function () {
  it('can have components added to it', function () {
    var circuit = new Circuit();

    var andGate = new AndGate();

    circuit.add( andGate );

    expect( circuit.numberOfComponents() ).toBe( 1 );
  });

  it('can have components removed from it', function () {
    var circuit = new Circuit();

    var andGate = new AndGate();

    circuit.add( andGate );

    expect( circuit.numberOfComponents() ).toBe( 1 );

    circuit.remove( andGate );

    expect( circuit.numberOfComponents() ).toBe( 0 );
  });

  it('can string together components', function () {
    var circuit = new Circuit();
    var andGate = new AndGate();
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var ground = new Ground();
    
    circuit.add( andGate );
    circuit.add( trueMock );
    circuit.add( falseMock );
    circuit.add( ground ).watch();

    circuit.connect( trueMock ).to( andGate );
    circuit.connect( falseMock ).to( andGate );
    circuit.connect( andGate ).to( ground );

    var watchers = circuit.run();

    expect( watchers[0] ).toEqual( 0 );
  });

  it('can disconnect components', function () {
    var circuit = new Circuit();
    var andGate = new AndGate();
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var ground = new Ground();
    
    circuit.add( andGate );
    circuit.add( trueMock );
    circuit.add( falseMock );
    circuit.add( ground ).watch();

    circuit.connect( trueMock ).to( andGate );
    circuit.connect( falseMock ).to( andGate );
    circuit.connect( andGate ).to( ground );

    circuit.disconnect( falseMock ).from( andGate );

    var watchers = circuit.run()
    
    expect( watchers[0] ).toEqual( 5 );
  });

  it('can tick', function () {
    var circuit = new Circuit();
    var andGate = new AndGate();
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var ground = new Ground();
    
    circuit.add( andGate );
    circuit.add( trueMock );
    circuit.add( falseMock );
    circuit.add( ground ).watch();

    circuit.connect( trueMock ).to( andGate );
    circuit.connect( falseMock ).to( andGate );
    circuit.connect( andGate ).to( ground );

    var watchers = circuit.run();
    expect( watchers[0] ).toEqual( 0 );

    circuit.disconnect( falseMock ).from( andGate );

    watchers = circuit.run();
    expect( watchers[0] ).toEqual( 0 );

    circuit.tick();

    watchers = circuit.run();
    expect( watchers[0] ).toEqual( 5 );
  });

  it('can emulate a flip flop circuit', function () {
    var trueMock_1 = new TrueLogicMockComponent();
    var trueMock_2 = new TrueLogicMockComponent();
    var switchSet   = new Switch();
    var switchReset = new Switch();
    var nor_1 = new NorGate();
    var nor_2 = new NorGate();
    var ground = new Ground();

    var circuit = new Circuit();

    circuit.add( trueMock_1 );
    circuit.add( trueMock_2 );
    circuit.add( switchSet );
    circuit.add( switchReset );
    circuit.add( nor_1 );
    circuit.add( nor_2 );
    circuit.add( ground ).watch();

    circuit.connect( trueMock_1 ).to( switchSet );
    circuit.connect( trueMock_2 ).to( switchReset );
    circuit.connect( switchSet ).to( nor_1 );
    circuit.connect( switchReset ).to( nor_2 );
    circuit.connect( nor_1 ).to( nor_2 );
    circuit.connect( nor_2 ).to( nor_1 );
    circuit.connect( nor_2 ).to( ground );

    switchSet.turnOn();
    switchReset.turnOff();

    var watchers = circuit.run();
    expect( watchers[0] ).toEqual( 5 );

    switchSet.turnOff();
    switchReset.turnOff();

    circuit.tick();

    watchers = circuit.run();
    expect( watchers[0] ).toEqual( 5 );

    switchSet.turnOff();
    switchReset.turnOn();

    circuit.tick();

    watchers = circuit.run();
    expect( watchers[0] ).toEqual( 0 );
  });

  it('disconnects a component when it is removed', function () {
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var orGate = new OrGate();
    var ground = new Ground();

    var circuit = new Circuit();

    circuit.add( trueMock );
    circuit.add( falseMock );
    circuit.add( orGate );
    circuit.add( ground ).watch();

    circuit.connect( trueMock ).to( orGate );
    circuit.connect( falseMock ).to( orGate );
    circuit.connect( orGate ).to( ground );

    var watchers = circuit.run();
    expect( watchers[0] ).toBe( 5 );

    circuit.remove( trueMock );

    circuit.tick();
    var watchers = circuit.run();
    expect( watchers[0] ).toBe( 0 );
  });

  it('can have multiple watchers', function () {
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var orGate = new OrGate();
    var ground = new Ground();

    var circuit = new Circuit();

    circuit.add( trueMock ).watch();
    circuit.add( falseMock ).watch();
    circuit.add( orGate );
    circuit.add( ground ).watch();

    circuit.connect( trueMock ).to( orGate );
    circuit.connect( falseMock ).to( orGate );
    circuit.connect( orGate ).to( ground );

    var watchers = circuit.run();
    expect( watchers[0] ).toBe( 5 );
    expect( watchers[1] ).toBe( 0 );
    expect( watchers[2] ).toBe( 5 );
  });

  it('can have inputs and outputs', function () {
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var orGate = new OrGate();
    var ground = new Ground();

    var circuit = new Circuit();

    circuit.add( orGate );

    circuit.setInput( orGate, 'A' );
    circuit.setInput( orGate, 'B' );

    circuit.connect( trueMock ).toInput( 'A' );
    circuit.connect( falseMock ).toInput( 'B' );

    circuit.setOutput( orGate, 'C' );

    circuit.connect( ground ).toOutput( 'C' );

    var result = ground.run();

    expect( result ).toBe( 5 );
  });

  it('can disconnect inputs', function () {
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var orGate = new OrGate();
    var ground = new Ground();

    var circuit = new Circuit();

    circuit.add( orGate );

    circuit.setInput( orGate, 'A' );
    circuit.setInput( orGate, 'B' );

    circuit.connect( trueMock ).toInput( 'A' );
    circuit.connect( falseMock ).toInput( 'B' );

    circuit.setOutput( orGate, 'C' );

    circuit.connect( ground ).toOutput( 'C' );

    var result = ground.run();

    expect( result ).toBe( 5 );

    ground.tick();
    circuit.tick();

    circuit.disconnect( trueMock ).fromInput( 'B' );

    var result = ground.run();

    expect( result ).toBe( 0 );
  });

  it('can reassign outputs', function () {
    var trueMock = new TrueLogicMockComponent();
    var falseMock = new FalseLogicMockComponent();
    var orGate = new OrGate();
    var ground = new Ground();

    var circuit = new Circuit();

    circuit.add( orGate );

    circuit.setInput( orGate, 'A' );
    circuit.setInput( orGate, 'B' );

    circuit.connect( falseMock ).toInput( 'A' );
    circuit.connect( falseMock ).toInput( 'B' );

    circuit.setOutput( orGate, 'C' );

    circuit.connect( ground ).toOutput( 'C' );

    var result = ground.run();

    expect( result ).toBe( 0 );

    ground.tick();
    circuit.tick();

    circuit.connect( trueMock ).toInput( 'A' );

    var result = ground.run();

    expect( result ).toBe( 5 );
  });
});
