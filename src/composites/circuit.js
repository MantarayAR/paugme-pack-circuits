module.exports = function Circuit() {
  var components = [];
  var watchers   = [];
  var inputs     = [];
  var outputs    = [];
  var overrides  = [];

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
      },
      toInput : function ( label ) {
        var component = inputs[ label ];
        var override = overrides[ label ];

        if ( override ) {
          component.overrideInputFrom( override ).with( from );
        }

        if ( component ) {
          component.addInput( from );
        }
      },
      toOutput: function ( label ) {
        var component = outputs[ label ];

        if ( component ) {
          from.addInput( component );
        }
      }
    }
  }

  this.disconnect = function ( component ) {
    var that = this;
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
          that.disconnect( component ).from( components[i] );
        }
      },
      fromInput : function ( label ) {
        var input = inputs[ label ];

        if ( input ) {
          that.disconnect( component ).from( input );
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

  this.setInput = function ( component, label ) {
    inputs[ label ] = component;
  };

  this.setOutput = function ( component, label ) {
    outputs[ label ] = component;
  };
};
