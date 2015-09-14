var Level = require('../level');

var Game = function ( game ) {
  
};

Game.prototype.create = function () {
  this.buildWorld();
};

Game.prototype.update = function () {
  // TODO
};

Game.prototype.updateSeconds = function () {
  // TODO
};

Game.prototype.buildWorld = function () {
  var seed = 0;

  // TODO
  // var seed = + new Date();

  this.level = Level.generateLevel( seed );
};

module.exports = Game;