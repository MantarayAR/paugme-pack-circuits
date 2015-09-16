/**
 * @namespace Top-level ROT namespace
 */
module.exports = {
  /**
   * @returns {bool} Is rot.js supported by this browser?
   */
  isSupported: function() {
    return !!(document.createElement("canvas").getContext && Function.prototype.bind);
  },

  /** Default with for display and map generators */
  DEFAULT_WIDTH: 80,
  /** Default height for display and map generators */
  DEFAULT_HEIGHT: 25,

  /** Directional constants. Ordering is important! */
  DIRS: {
    "4": [
      [ 0, -1],
      [ 1,  0],
      [ 0,  1],
      [-1,  0]
    ],
    "8": [
      [ 0, -1],
      [ 1, -1],
      [ 1,  0],
      [ 1,  1],
      [ 0,  1],
      [-1,  1],
      [-1,  0],
      [-1, -1]
    ],
    "6": [
      [-1, -1],
      [ 1, -1],
      [ 2,  0],
      [ 1,  1],
      [-1,  1],
      [-2,  0]
    ]
  }
};