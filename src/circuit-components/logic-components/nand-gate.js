var Class        = require('../../../framework/class/class.js');
var Component    = require('../../../framework/components/component.js');
var Gate         = require('../../../framework/components/gate.js');
var LogicHandler = require('../../handlers/logic-handler.js');

module.exports = function NandGate() {
  Class.extend( Component, this );
  Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    var inputs = [];

    for ( var i = 0; i < this.inputs.length; i++ ) {
      var result = this.logicHandler.toBoolean(
        this.inputs[i].run()
      );

      inputs.push( result );      
    }

    var result = false;

    if ( inputs.length > 0 ) {
      result = inputs.reduce(function ( a, b ) {
        return a && b;
      });
    }

    return this.logicHandler.toVoltage( ! result );
  }
}
