var Weapon = require('../weapon');
var CircuitSpecification = require('../../specifications/circuit-specification');

module.exports = function PhaserWeapon() {
  this.Class.extend( Weapon, this );

  this.name = 'Phaser';

  /**
   * Satisfiable by an AND gate
   */
  this.getSpecification = function () {
    var specification = new CircuitSpecification();

    specification.setLabels(
      'I,J => K'
    );

    specification.setTable(
      '0,0 => 0',
      '0,1 => 0',
      '1,0 => 0',
      '1,1 => 1'
    );

    return specification;
  }
};