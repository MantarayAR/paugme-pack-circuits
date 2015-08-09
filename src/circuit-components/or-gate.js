
function OrGate() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    var value = false;

    for ( var i = 0; i < this.inputs.length; i++ ) {
      value |= this.logicHandler.toBoolean( this.inputs[i].calculate() );
    }

    return this.logicHandler.toVoltage( value );
  }
}