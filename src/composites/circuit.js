module.exports = function Circuit() {
  var components = [];
  var watchers = [];

  this.add = function ( component ) {
    components.push( component );

    return {
      watch : function () {
        watchers.push( component );
      }
    }
  }

  this.remove = function ( component ) {
    for ( var i = 0; i < components.length; i++ ) {
      if ( component === components[i] ) {
        components.splice( i, 1 );
        this.disconnect( component ).fromEverything();
        break;
      }
    }
  }

  this.connect = function ( from ) {
    return {
      to : function ( into ) {
        into.addInput( from );
      }
    }
  }

  this.disconnect = function ( component ) {
    return {
      from : function ( from ) {
        for ( var i = 0; i < from.inputs.length; i++ ) {
          if ( component === from.inputs[i] ) {
            from.removeInput( i );
            break;
          }
        }
      },
      fromEverything : function () {
        for ( var i = 0; i < components.length; i++ ) {
          this.disconnect( component ).from( components[i] );
        }
      }
    }
  }

  this.run = function () {
    var calculations = [];

    for ( var i = 0; i < watchers.length; i++ ) {
      calculations.push( watchers[i].run() );
    }

    return calculations;
  }

  this.tick = function () {
    for ( var i = 0; i < components.length; i++ ) {
      components[i].tick();
    }
  }

  this.numberOfComponents = function () {
    return components.length;
  };
};