var Point = require('./vector');

module.exports = function Vector( x, y ) {
  this.x = 0;
  this.y = 0;

  this.setPoint = function ( x, y ) {
    if ( typeof x === 'object' ) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  };

  this.setMagnitudeAndDirection = function ( magnitude, direction ) {
    x = magnitude * Math.cos( direction  * Math.PI / 180 );
    y = magnitude * Math.sin( direction  * Math.PI / 180 );

    this.x = x;
    this.y = y;
  }

  if ( x && y ) {
    this.setPoint( x, y );
  }
};
