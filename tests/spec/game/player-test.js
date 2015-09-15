var Player = require('../../../src/game/player');
var Point  = require('../../../framework/graph/point');
var Direction = require('../../../framework/graph/direction');
var Vector = require('../../../framework/graph/vector');

describe('a player', function () {
  var DIAGONAL = 0.7071067811865475;

  beforeEach(function () {
    this.player = new Player({
      startingPosition: new Point( 0, 0 ),
      scale: 1
    });
  });

  it('can move north', function () {
    this.player.move( Direction.NORTH );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( 0 );
    expect( position.y ).toBeCloseTo( -1 );
  });

  it('can move north-east', function () {
    this.player.move( Direction.NORTHEAST );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( DIAGONAL );
    expect( position.y ).toBeCloseTo( -DIAGONAL );
  });

  it('can move east', function () {
    this.player.move( Direction.EAST );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( 1 );
    expect( position.y ).toBeCloseTo( 0 );
  });

  it('can move south-east', function () {
    this.player.move( Direction.SOUTHEAST );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( DIAGONAL );
    expect( position.y ).toBeCloseTo( DIAGONAL );
  });

  it('can move south', function () {
    this.player.move( Direction.SOUTH );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( 0 );
    expect( position.y ).toBeCloseTo( 1 );
  });

  it('can move south-west', function () {
    this.player.move( Direction.SOUTHWEST );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( -DIAGONAL );
    expect( position.y ).toBeCloseTo( DIAGONAL );
  });

  it('can move west', function() {
    this.player.move( Direction.WEST );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( -1 );
    expect( position.y ).toBeCloseTo( 0 );
  });

  it('can move north-west', function () {
    this.player.move( Direction.NORTHWEST );

    var position = this.player.position;

    expect( position.x ).toBeCloseTo( -DIAGONAL );
    expect( position.y ).toBeCloseTo( -DIAGONAL );
  });

  it('can take damage', function () {
    this.player.health = 100;
    this.player.takeDamage( 10 );

    expect( this.player.health ).toBe( 90 );
  });

  it('can throttle damage', function () {
    this.player.health = 100;
    this.player.takeDamage( 10 );
    this.player.takeDamage( 10 );
    this.player.takeDamage( 10 );

    expect( this.player.health ).toBe( 90 );
  });

  it('can take damage after throttle', function () {
    this.player.health = 100;
    this.player.damageThrottleFrames = 1;
    this.player.takeDamage( 10 );
    this.player.takeDamage( 10 );

    this.player.tick();

    this.player.takeDamage( 10 );
    this.player.takeDamage( 10 );

    expect( this.player.health ).toBe( 80 );
  });

  it('does not take damage if invincible', function () {
    this.player.isInvincible = true;
    this.player.health = 100;

    this.player.takeDamage( 10 );

    expect( this.player.health ).toBe( 100 );
  });

  it('can add a gate to its inventory', function () {
    this.player.addGate( { name : 'test' } );

    expect( this.player.gates.size() ).toBe( 1 );
  });

  it('can remove a gate from its inventory', function () {
    var mock = { name : 'test' };
    this.player.addGate( mock );

    this.player.removeGate( mock );

    expect( this.player.gates.size() ).toBe( 0 );
  });

  it('can remove a gate from its inventory by name', function () {
    var mock = { name : 'test' };
    this.player.addGate( mock );
    this.player.removeGateByName( 'test' );

    expect( this.player.gates.size() ).toBe( 0 );
  });

  it('can add enable a weapon in its inventory', function () {
    this.player.enableWeapon( 'Phaser' );

    expect( this.player.weapons.getItem( 'Phaser' ).enabled ).toBe( true );
  });

  it('can add disable a weapon in its inventory', function () {
    this.player.enableWeapon( 'Phaser' );
    this.player.disableWeapon( 'Phaser' );

    expect( this.player.weapons.getItem( 'Phaser' ).enabled ).toBe( false );
  });
});
