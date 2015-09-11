var Player = require('../../src/game/player');
var Point  = require('../../framework/graph/point');
var Direction = require('../../framework/graph/direction');
var Vector = require('../../framework/graph/vector');

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
});
