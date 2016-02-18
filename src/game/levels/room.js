var Point = require('../../framework/graph/point');

function Room( height, width, doors ) {
  this.height = 10;
  this.width  = 10;
  this.doors  = [];

  if ( height ) {
    this.height = height;
  }

  if ( width ) {
    this.width = width;
  }

  if ( doors ) {
    this.doors = doors;
  }

  this.addDoor = function ( x, y ) {
    this.doors.push( {
      position: new Point( x, y )
    } );
  }
};

module.exports = Room;
