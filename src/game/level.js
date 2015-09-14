function Level() {

}

/**
 * This game is a rogue-like that will prodecurally generate
 * the level.
 */
Level.generateLevel = function ( seed ) {
  var realSeed = +new Date();

  if ( seed ) {
    realSeed = seed;
  }

  // TODO
};

module.exports = Level;