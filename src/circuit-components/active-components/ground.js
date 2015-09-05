var Class        = require('../../../framework/class/class.js');
var Component    = require('../../../framework/components/component.js');
var Gate         = require('../../../framework/components/gate.js');

module.exports = function Ground() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

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
