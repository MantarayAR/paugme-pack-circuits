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
  // TODO
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