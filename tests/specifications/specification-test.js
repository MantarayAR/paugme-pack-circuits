var CircuitSpecification = require('../../src/specifications/circuit-specification');
var Circuit = require('../../src/composites/circuit');
var AndGate = require('../../src/circuit-components/logic-components/and-gate');
var OrGate  = require('../../src/circuit-components/logic-components/or-gate');
var NorGate  = require('../../src/circuit-components/logic-components/nor-gate');

describe('a specification', function () {
  beforeEach(function () {
    this.specification = new CircuitSpecification();
    this.circuit       = new Circuit();
    this.andGate       = new AndGate();
    this.orGate        = new OrGate();
    this.norGate1      = new NorGate();
    this.norGate2      = new NorGate();
  })

  it('can be described by a truth table', function () {
    this.specification.setLabels(
      'I,J => K'
    );
    this.specification.setTable(
      '0,0 => 0',
      '0,1 => 0',
      '1,0 => 0',
      '1,1 => 1'
    );
    this.circuit.add( this.andGate );
    this.circuit.setInput( this.andGate, 'I' );
    this.circuit.setInput( this.andGate, 'J' );
    this.circuit.setOutput( this.andGate, 'K' );

    var result = this.specification.isSatisfiedBy(
      this.circuit
    );

    expect( result ).toBe( true );
  });

  it('can fail when given an incorrect circuit', function () {
    this.specification.setLabels(
      'I,J => K'
    );
    this.specification.setTable(
      '0,0 => 0',
      '0,1 => 0',
      '1,0 => 0',
      '1,1 => 1'
    );
    this.circuit.add( this.orGate );
    this.circuit.setInput( this.orGate, 'I' );
    this.circuit.setInput( this.orGate, 'J' );
    this.circuit.setOutput( this.orGate, 'K' );

    var result = this.specification.isSatisfiedBy(
      this.circuit
    );

    expect( result ).toBe( false );
  });

  it('can test a flip flop without checking state', function () {
    this.specification.setLabels(
      'S,R => Q`'
    );
    this.specification.setTable(
      '0,0 => X',
      '0,1 => 0',
      '1,0 => 1',
      '1,1 => X'
    );

    this.circuit.add( this.norGate1 );
    this.circuit.add( this.norGate2 );

    this.circuit.connect( this.norGate1 ).to( this.norGate2 );
    this.circuit.connect( this.norGate2 ).to( this.norGate1 );

    this.circuit.setInput( this.norGate1, 'R' );
    this.circuit.setInput( this.norGate2, 'S' );
    this.circuit.setOutput( this.norGate1, 'Q`' );

    var result = this.specification.isSatisfiedBy(
      this.circuit
    );

    expect( result ).toBe( true );
  });

  it('can test a flip flop by ticking', function () {
    this.specification.setLabels(
      'S,R => Q`'
    );
    this.specification.setTable(
      '0,0 => 0 | 0,0 => 0',
      '1,0 => 1 | 0,0 => 1',
      '1,0 => 1 | 0,0 => 1 | 0,1 => 0',
      '0,1 => 0 | 0,0 => 0',
      '1,1 => X'
    );

    this.circuit.add( this.norGate1 );
    this.circuit.add( this.norGate2 );

    this.circuit.connect( this.norGate1 ).to( this.norGate2 );
    this.circuit.connect( this.norGate2 ).to( this.norGate1 );

    this.circuit.setInput( this.norGate1, 'R' );
    this.circuit.setInput( this.norGate2, 'S' );
    this.circuit.setOutput( this.norGate1, 'Q`' );

    var result = this.specification.isSatisfiedBy(
      this.circuit
    );

    expect( result ).toBe( true );
  });
});
