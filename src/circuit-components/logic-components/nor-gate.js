var Class        = require('../../../framework/class/class.js');
var Component    = require('../../../framework/components/component.js');
var Gate         = require('../../../framework/components/gate.js');
var LogicHandler = require('../../handlers/logic-handler.js');

module.exports = function NorGate() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    var value = 0;

    for ( var i = 0; i < this.inputs.length; i++ ) {
      value += this.inputs[i].run();
    }

    value = this.logicHandler.toBoolean( value );

    return this.logicHandler.toVoltage( ! value );
  }
}