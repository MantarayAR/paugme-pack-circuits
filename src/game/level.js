
function Tile( x, y, type ) {
  this.x = x;
  this.y = y;
  this.type = type;
}

function Room( x, y, width, height ) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

function Level() {

}

/**
 * This game is a rogue-like that will prodecurally generate
 * the level.
 */
Level.generateLevel = function ( seed ) {
  // Helper functions
  var getRandom = function ( min, max ) {
    return Math.floor( Math.random() * (max - min) ) + min;
  }

  var shouldMakeRoom = function () {
    return Math.floor( Math.random() + 0.5 )
  }

  var updateMapWithRoom = function ( map, room ) {
    for ( var y = room.y; y < room.y + room.height; y++ ) {
      for ( var x = room.x; x < room.x + room.width; x++ ) {
        if ( y == room.y || y == room.y + room.height - 1 ||
             x == room.x || x == room.x + room.width - 1 ) {
          map[y][x] = new Tile( x, y, 'wall' );
        } else {
          map[y][x] = new Tile(x, y, 'floor' );
        }
      }
    }

    return map;
  }

  var realSeed = +new Date();

  if ( seed ) {
    realSeed = seed;
  }

  var map        = [];
  var rooms      = [];

  var worldWidthSize = 50;
  var worldHeightSize = 100;

  var minRoomSize = 7;
  var maxRoomSize = 13;

  var lastRoomX = 0;
  var lastRoomY = 0;

  var makeRoom = function ( x, y ) {
    var width = getRandom( minRoomSize, maxRoomSize );
    var height = getRandom( minRoomSize, maxRoomSize );

    var x = x;
    var y = y;

    return new Room( x, y, width, height );
  }

  // Prefill map
  for ( var y = 0; y < worldHeightSize; y++ ) {
    map[y] = [];
    for( var x = 0; x < worldWidthSize; x++ ) {
      map[y][x] = new Tile(x, y, 'nothing');
    }
  }

  for ( var y = 0; y < worldHeightSize; y++ ) {
    for( var x = 0; x < worldWidthSize; x++ ) {
      if ( y < lastRoomY && x < lastRoomX ) {
        continue;
      }

      // Determine whether to make a room or move on
      if ( shouldMakeRoom() ) {
        var room = makeRoom( x, y );

        if ( room.width + room.x > worldWidthSize ||
             room.height + room.y > worldHeightSize ) {
          continue;
        } else {
          lastRoomX = room.width + room.x + 1;

          var tempY = room.height + room.y + 1;
          lastRoomY = (tempY > lastRoomY) ? tempY : lastRoomY;
          rooms.push( room );
          map = updateMapWithRoom( map, room );
        }
      }
    }
  }

  // Print
  for ( var y = 0; y < map.length; y++ ) {
    var buffer = '';
    for( var x = 0; x < map[y].length; x++ ) {
      switch ( map[y][x].type ) {
        case 'nothing':
          buffer += ' ';
          break;
        case 'wall':
          buffer += 'X';
          break;
        case 'floor':
          buffer += 'O';
          break;
      }
    }
    console.log(buffer);
  }

};

module.exports = Level;
