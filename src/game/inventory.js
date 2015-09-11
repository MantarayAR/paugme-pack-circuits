var WeaponsConstants = require('./weapons-constants');
var PlayerConstants  = require('./player-constants');

function Inventory() {
  var items = {};

  this.addItem = function ( itemName, item ) {
    if ( items[itemName] ) {
      items[itemName].amount++;
    } else {
      items[itemName] = {
        value : item,
        amount : 1
      };
    }
  };

  this.removeItem = function ( itemName ) {
    if ( items[itemName] ) {
      if ( items[itemName].amount > 1 ) {
        items[itemName].amount--;  
      } else {
        delete items[itemName];
      }
    }
  };

  this.getItem = function ( itemName ) {
    if ( this.hasItem( itemName ) ) {
      return items[itemName].value;
    }

    return null;
  };

  this.hasItem = function ( itemName ) {
    if ( items[itemName] ) {
      if ( items[itemName].amount > 0 ) {
        return true;
      }
    }

    return false;
  };

  this.size = function () {
    return Object.keys( items ).length;
  }
};

Inventory.buildEmpty = function () {
  return new Inventory();
};
Inventory.buildInitialWeapons = function () {
  var inventory = new Inventory();

  for ( var i = 0; i < WeaponsConstants.REGISTERED_WEAPONS.length; i++ ) {
    var item = new WeaponsConstants.REGISTERED_WEAPONS[i]();
    inventory.addItem( item.name, item );
  }

  return inventory;
};

module.exports = Inventory;
