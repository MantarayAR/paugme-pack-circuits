var Map = require('./map');
var Class = require('../../../framework/class/class');

/**
 * @class Dungeon map: has rooms and corridors
 * @augments ROT.Map
 */
Dungeon = function(width, height) {
  this.Class.extend( Map, this );
	Map.call(this, width, height);
	this._rooms = []; /* list of all rooms */
	this._corridors = [];
}

/**
 * Get all generated rooms
 * @returns {ROT.Map.Feature.Room[]}
 */
Dungeon.prototype.getRooms = function() {
	return this._rooms;
}

/**
 * Get all generated corridors
 * @returns {ROT.Map.Feature.Corridor[]}
 */
Dungeon.prototype.getCorridors = function() {
	return this._corridors;
}

module.exports = Dungeon;