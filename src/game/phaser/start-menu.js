var LabelButton = require('./components/label-button');

var StartMenu = function ( game ) {
  this.game = game;

  this.titleText;
  this.startButton;
};

StartMenu.prototype.create = function () {  
  // Set up the Start Menu
  var __ = this.game.cache.getJSON('i18n');

  var style = {
    font: '60px Monospace',
    fill: '#fff',
    align: 'center'
  };

  var buttonStyle = {
    font: '35px Monospace',
    fill: '#000',
    align: 'center'
  };

  this.titleText = this.game.add.text(
    this.game.width / 2.0,
    100,
    __['title'],
    style
  );
  this.titleText.anchor.x = 0.5;

  this.startButton = new LabelButton(
      this.game,
      this.game.world.centerX,
      250,
      'button',
      __['start_game'],
      this.onClickStartGame,
      this,
      2, // over
      1, // off
      0  // down
  );

  this.signInButton = new LabelButton(
      this.game,
      this.game.world.centerX,
      300,
      'button',
      __['sign_in'],
      this.onClickSignIn,
      this,
      2,
      1,
      0
  );

  this.startButton.label.setStyle( buttonStyle );
  this.signInButton.label.setStyle( buttonStyle );
};

StartMenu.prototype.update = function () {
  this.animateTitle();
  this.animateButton( this.startButton );
  this.animateButton( this.signInButton );
};

StartMenu.prototype.animateTitle = function () {
  var scale = 1 + 0.05 * Math.sin( 3 * this.game.time.totalElapsedSeconds() % ( Math.PI * 2 ) );

  this.titleText.scale.x = scale;
  this.titleText.scale.y = scale;

  var rotation = 0.01 * Math.sin( 2 * this.game.time.totalElapsedSeconds() % ( Math.PI * 2 ) ) % Math.PI * 2;

  this.titleText.rotation = rotation;
};

StartMenu.prototype.animateButton = function ( button ) {
  var scale = 1 + 0.01 * Math.sin( 3 * this.game.time.totalElapsedSeconds() % ( Math.PI * 2 ) );

  button.scale.x = scale;
  button.scale.y = scale;
}

StartMenu.prototype.onClickStartGame = function () {
  // TODO
};

StartMenu.prototype.onClickSignIn = function () {
  // TODO
};

module.exports = StartMenu;
