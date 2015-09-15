var Boot = function ( game ) {
  this.game = game;
};

Boot.prototype.preload = function () {
  // TODO load in any title images

  // TODO support different languages
  this.game.load.json('i18n', 'assets/i18n/en.json');
};

/**
 * Setup the game scaling
 */
Boot.prototype.create = function () {
  this.game.stage.disableVisibilityChange = false;
  // Scale the game to full screen
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.minWidth = 480;
  this.game.scale.minHeight = 270;
  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;
  this.game.stage.forceLandscape = true;

  this.game.input.maxPointers = 1;
  this.game.input.addPointer();

  this.game.stage.backgroundColor = "#121270";

  this.game.state.start('Preloader');
}

module.exports = Boot;