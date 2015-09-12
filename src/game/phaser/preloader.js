var Preloader = function ( game ) {
  this.soundNamesCache = [];

  this.allSoundsDecoded = function () {
    for ( var i = 0; i < this.soundNamesCache.length; i++ ) {
      if ( ! this.cache.isSoundDecoded( this.soundNamesCache[i] ) ) {
        return false;
      }
    }

    return true;
  }
};

Preloader.prototype.preload = function () {
  // TODO preload assets
};

Preloader.prototype.create = function () {
  // TODO do any further setup
};

Preloader.prototype.update = function () {
  if ( this.allSoundsDecoded() && ! this.ready ) {
    this.ready = true;
    this.state.start('StartMenu');
  }
};

module.exports = Preloader;