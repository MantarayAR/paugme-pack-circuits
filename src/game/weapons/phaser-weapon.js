var Weapon = require('../weapon');
var Specification = require('../../../framework/specifications/specification');

module.exports = function PhaserWeapon() {
  this.Class.extend( Weapon, this );

  this.name = 'Phaser';

  /**
   * Satisfiable by an AND gate
   */
  this.getSpecification = function () {
    var specification = new Specification();

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