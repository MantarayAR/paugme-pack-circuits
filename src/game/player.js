var PlayerConstants = require('./player-constants');
var Inventory       = require('./inventory');
var Point           = require('../../framework/graph/point');
var Vector = require('../../framework/graph/vector');

module.exports = function Player( init ) {
  this.health    = PlayerConstants.MAXIMUM_HEALTH;
  this.gates     = Inventory.buildEmpty();
  this.weapons   = Inventory.buildInitialWeapons();
  this.position  = new Point(0, 0);
  this.scale     = 1;
  this.isInvincible = false;
  this.damageThrottleFrames = 5;
  this.damageThrottle = 0;

  if ( init ) {
    if ( init.startingPosition ) {
      this.position = init.startingPosition;
    }

    if ( init.scale ) {
      this.scale = init.scale;
    }
  }

  this.addGate = function ( gateItem ) {
    this.gates.addItem( gateItem.name, gateItem );
  };

  this.removeGate = function ( gateItem ) {
    this.gates.removeItem( gateItem.name );
  };

  this.removeGateByName = function ( gateItemName ) {
    this.gates.removeItem( gateItemName );
  };

  this.enableWeapon = function( weaponItemName ) {
    this.weapons.getItem( weaponItemName ).enable();
  };

  this.disableWeapon = function( weaponItemName ) {
    this.weapons.getItem( weaponItemName ).disable();
  };

  this.move = function( direction ) {
    var vector = new Vector();
    vector.setMagnitudeAndDirection( this.scale, direction );

    this.position.add( vector );
  };

  this.takeDamage = function( damage ) {
    if ( this.canTakeDamage() ) {
      this.health -= damage;
      this.damageThrottle = this.damageThrottleFrames;
    }
  };

  this.canTakeDamage = function() {
    if ( this.isInvincible ) {
      return false;
    }

    if ( this.damageThrottle === 0 ) {
      return true;
    }

    return false;
  };

  this.tick = function () {
    if ( this.damageThrottle > 0 ) {
      this.damageThrottle -= 1;
    }
    
    // TODO anything else we need to tick
  }
};
