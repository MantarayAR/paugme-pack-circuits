function NotGate() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    var value = true;

    if ( this.inputs.length > 0 ) {
      value = ! this.logicHandler.toBoolean( this.inputs[0].calculate() );
    }

    return this.logicHandler.toVoltage( value );
  }
}