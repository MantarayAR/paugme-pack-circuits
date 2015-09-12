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
  var game = new Phaser.Game();

  game.state.add( 'Boot', TTR.Boot );
  game.state.add( 'Preloader', TTR.Preloader );
  game.state.add( 'StartMenu', TTR.StartMenu );
  game.state.add( 'Game', TTR.Game );

  game.state.start( 'Boot' );

  // Scale the game to full screen
  game.stage.scale.startFullScreen();
  game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
  game.stage.scale.setShowAll();
  game.stage.scale.refresh();
};