var PlayerConstants = require('player-constants');
var Inventory       = require('inventory');

module.exports = function Player() {
  this.health    = PlayerConstants.MAXIMUM_HEALTH;
  this.gates     = Inventory.buildEmpty();
  this.weapons   = Inventory.buildInitialWeapons();

  this.addGate = function ( gateItem ) {
    this.gates.addItem( gateItem.name, gateItem );
  };

  this.removeGate = function ( gateItem ) {
    this.gates.removeItem( gateItem.name );
  };

  this.removeGateByName = function ( gateItemName ) {
    this.gates.removeItem( gateItem.name );
  };

  this.enableWeapon = function( weaponItemName ) {
    this.weapons.getItem( weaponItemName ).enable();
  };

  this.disableWeapon = function( weaponItemName ) {
    this.weapons.getItem( weaponItemName ).disable();
  };
};
