var LabelButton = require('./components/label-button');

var VibrationFacade = require('../../../framework/facades/vibrate');

var StartMenu = function ( game ) {
  this.game = game;
  this.startMenuState = 'idle';

  this.titleText;
  this.startButton;

  this.buttons = [];
};

StartMenu.prototype.create = function () {  
  // Set up the Start Menu
  var __ = this.game.cache.getJSON('i18n');

  var style = {
    font: '70px pixeltype',
    fill: '#fff',
    align: 'center'
  };

  var buttonStyle = {
    font: '39px pixeltype',
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


  this.buttons.push( this.startButton );
  this.buttons.push( this.signInButton );
};

StartMenu.prototype.update = function () {
  this.animateTitle();

  for ( var i = 0; i < this.buttons.length; i++ ) {
    this.animateButton( this.buttons[i] );
  }
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

StartMenu.prototype.startGame = function () {
  console.log( 'Starting Game' );

  this.game.state.start('Game');
};

StartMenu.prototype.onClickStartGame = function () {
  if ( this.startMenuState === 'idle' ) {
    this.startMenuState = 'animating';

    VibrationFacade.vibrate( 'low' );
    
    var delay = 0;

    for ( var i = this.buttons.length - 1; i >= 0; i-- ) {
      this.game.add.tween( this.buttons[i] ).to(
        { x : - this.game.world.width * 1.5 },
        1000, Phaser.Easing.Cubic.Out,
        true,
        delay
      );
    }

    var tween = this.game.add.tween( this.titleText ).to(
        { x : - this.game.world.height * 1.5 },
        1000, Phaser.Easing.Cubic.Out,
        true,
        delay
      );

    tween.onComplete.add( this.startGame, this );
  }
};

StartMenu.prototype.onClickSignIn = function () {
  // TODO

  VibrationFacade.vibrate( 'low' );
};

module.exports = StartMenu;
