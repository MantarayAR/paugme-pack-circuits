var LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
  Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

  var fontOffset = -4; // This is dependent on the font.

  this.style = {
      'font': '10px Arial',
      'fill': 'black',
      'align' : 'center'
  };
  this.anchor.setTo( 0.5, 0.5 );
  this.label = new Phaser.Text(game, 0, fontOffset, label, this.style);

  this.label.anchor.setTo( 0.5, 0.5 );

  this.addChild(this.label);
  this.setLabel( label );

  game.add.existing( this );
};
 
LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;
 
LabelButton.prototype.setLabel = function( label ) {
  this.label.setText(label);
};

module.exports = LabelButton;
