var Class     = require('../../../framework/class/class');
var Component = require('../../../framework/components/component');
var Gate      = require('../../../framework/components/gate');

module.exports = function OneTerminalVoltageSource() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.TRUE_VOLTAGE;
  }
}