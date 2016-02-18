var Boot      = require('./phaser/boot');
var Preloader = require('./phaser/preloader');
var StartMenu = require('./phaser/start-menu');
var Game      = require('./phaser/game');

var TTR = {
  Boot : Boot,
  Preloader : Preloader,
  StartMenu : StartMenu,
  Game : Game
};

module.exports = function Game() {
  var size = {
    x: 960,
    y: 540
  };

  var game = new Phaser.Game(
    size.x,
    size.y,
    Phaser.AUTO,
    'game-container'
  );

  game.state.add( 'Boot', TTR.Boot );
  game.state.add( 'Preloader', TTR.Preloader );
  game.state.add( 'StartMenu', TTR.StartMenu );
  game.state.add( 'Game', TTR.Game );

  game.state.start( 'Boot' );
};