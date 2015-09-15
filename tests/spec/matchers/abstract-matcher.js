module.exports = {
  hasNoAbstractMethods : function ( util, customEqualityTesters ) {
    return {
      compare : function ( obj ) {
        var expected = 0;
        var total    = 0;

        for ( var property in obj ) {
          if ( obj[property] == Class.abstractMethod ) {
            total += 1;
          }
        }

        return {
          pass : util.equals(total, expected, customEqualityTesters),
          message : 'Expected 0 abstract methods'
        }
      }
    }
  }
};
