var Boot = function ( game ) {};

Boot.prototype.preload = function () {
  // TODO load in any title images
};

/**
 * Setup the game scaling
 */
Boot.prototype.create = function () {
  
  this.stage.disableVisibilityChange = false;
  // Scale the game to full screen
  game.stage.scale.startFullScreen();
  game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
  game.stage.scale.setShowAll();
  game.stage.scale.refresh();

  this.input.maxPointers = 1;
  this.input.addPointer();

  this.stage.backgroundColor = "#171642";

  this.state.start('Preloader');
}

module.exports = Boot;