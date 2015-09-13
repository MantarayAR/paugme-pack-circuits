var StartMenu = function ( game ) {
  this.game = game;

  this.titleText;
};

StartMenu.prototype.create = function () {  
  // Set up the Start Menu
  var __ = this.game.cache.getJSON('i18n');

  var style = {
    font: '60px Monospace',
    fill: '#fff',
    align: 'center'
  };

  this.titleText = this.game.add.text(
    this.game.width / 2.0,
    100,
    __['title'],
    style
  );
  this.titleText.anchor.x = 0.5;

};

StartMenu.prototype.startGame = function () {
  // TODO

};

StartMenu.prototype.update = function () {
  this.animateTitle();
};

StartMenu.prototype.animateTitle = function () {
  var scale = 1 + 0.05 * Math.sin( 3 * this.game.time.totalElapsedSeconds() % ( Math.PI * 2 ) );

  this.titleText.scale.x = scale;
  this.titleText.scale.y = scale;

  var rotation = 0.01 * Math.sin( 2 * this.game.time.totalElapsedSeconds() % ( Math.PI * 2 ) ) % Math.PI * 2;

  this.titleText.rotation = rotation;
};

module.exports = StartMenu;