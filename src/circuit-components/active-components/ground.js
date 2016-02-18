var Class        = require('../../../framework/class/class');
var Component    = require('../../../framework/components/component');
var Gate         = require('../../../framework/components/gate');

module.exports = function Ground() {
  Class.extend( Component, this );
  Class.implement( Gate, this );

  this.calculate = function () {
    var maxValue = 0;
    for ( var i = 0; i < this.inputs.length; i++ ) {
      var currentValue = this.inputs[i].run();

      if ( currentValue > maxValue ) {
        maxValue = currentValue;
      }
    }
    return maxValue;
  }
};
