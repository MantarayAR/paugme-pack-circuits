var PhaserWeapon = require('../../src/game/weapons/phaser-weapon');
var Circuit = require('../../src/composites/circuit');
var AndGate = require('../../src/circuit-components/logic-components/and-gate');

describe('phaser weapon', function () {
  beforeEach(function () {
    this.weapon = new PhaserWeapon();

    var andGate  = new AndGate();
    this.circuit = new Circuit();
    this.circuit.add( andGate );
    this.circuit.setInput( andGate, 'I' );
    this.circuit.setInput( andGate, 'J' );
    this.circuit.setOutput( andGate, 'K' );
  });

  it('has a name', function () {
    expect( this.weapon.name ).toBe( 'Phaser' );
  });

  it('has a specification that is satisfiable by an and gate', function () {
    var specification = this.weapon.getSpecification();

    var result = specification.isSatisfiedBy( this.circuit );

    expect( result ).toBe( true );
  });
});