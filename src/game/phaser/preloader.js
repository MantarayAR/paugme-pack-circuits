var Preloader = function ( game ) {
  this.game = game;
  this.ready = false;

  this.soundNamesCache = [];

  this.allSoundsDecoded = function () {
    for ( var i = 0; i < this.soundNamesCache.length; i++ ) {
      if ( ! this.game.cache.isSoundDecoded( this.soundNamesCache[i] ) ) {
        return false;
      }
    }

    return true;
  }
};

Preloader.prototype.preload = function () {
  this.game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 150, 38);
  
  this.game.load.image('startMenuBackground00', 'assets/graphics/start-menu-background-00.png')
};

Preloader.prototype.create = function () {
  // TODO do any further setup
};

Preloader.prototype.update = function () {
  if ( this.allSoundsDecoded() && ! this.ready ) {
    this.ready = true;
    this.game.state.start('StartMenu');
  }
};

module.exports = Preloader;