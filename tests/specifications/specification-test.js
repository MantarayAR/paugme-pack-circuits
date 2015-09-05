var CircuitSpecification = require('../../src/specifications/circuit-specification');
var Circuit = require('../../src/composites/circuit');
var AndGate = require('../../src/circuit-components/logic-components/and-gate');
var OrGate  = require('../../src/circuit-components/logic-components/or-gate');

describe('a specification', function () {
  beforeEach(function () {
    this.specification = new CircuitSpecification();
    this.circuit       = new Circuit();
    this.andGate       = new AndGate();
    this.orGate        = new OrGate();
  })

  it('can be described by a truth table', function () {
    this.specification.setTable(
      'I,J => K',
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
    this.specification.setTable(
      'I,J => K',
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

  // it('can specify Q and Qnext type truth tables', function () {
  //   this.specification.setTable(
  //     'Q,S,R => N',
  //     '0,0,0 => X',
  //     '0,1,0 => 1',
  //     '1,0,1 => 0',
  //     '1,X,0 => 1'
  //   );
  // })
})