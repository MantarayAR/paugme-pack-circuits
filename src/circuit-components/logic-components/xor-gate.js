var Class        = require('../../../framework/class/class.js');
var Component    = require('../../../framework/components/component.js');
var Gate         = require('../../../framework/components/gate.js');
var LogicHandler = require('../../handlers/logic-handler.js');

module.exports = function XorGate() {
  Class.extend( Component, this );
  Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    var value = false;

    for ( var i = 0; i < this.inputs.length; i++ ) {
      var n = this.logicHandler.toBoolean( this.inputs[i].run() );
      value = value ? ! n : n;
    }

    return this.logicHandler.toVoltage( value );
  }
}