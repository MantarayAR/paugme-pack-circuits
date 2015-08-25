var Class        = require('../../framework/class/class.js');
var Component    = require('../../framework/components/component.js');
var Gate         = require('../../framework/components/gate.js');

module.exports = function OneTerminalVoltageSource() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.TRUE_VOLTAGE;
  }
}