var RNG = require('../rotjs/rng');
var Digger = require('../rotjs/map/digger');

var Level = {};

Level.generateLevel = function ( seed ) {
  RNG.setSeed( seed );
  var map = new Digger();
  map.create();

  console.log( map );
};

module.exports = Level;
