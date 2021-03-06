var Class        = require('../../../framework/class/class.js');
var Component    = require('../../../framework/components/component.js');
var Gate         = require('../../../framework/components/gate.js');
var LogicHandler = require('../../handlers/logic-handler.js');

module.exports = function Xnor() {
  Class.extend( Component, this );
  Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    var value = true;

    for ( var i = 0; i < this.inputs.length; i++ ) {
      value = ! value ^ ! this.logicHandler.toBoolean( this.inputs[i].run() );
    }

    return this.logicHandler.toVoltage( value );
  }  
};
