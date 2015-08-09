
function LogicHandler() {
  this.Class.implement( Handler, this );
  this.Class.implement( Gate, this );

  this.TRUE_VOLTAGE_THRESHOLD = 2.5;

  this.toBoolean = function ( voltage ) {
    return voltage > this.TRUE_VOLTAGE_THRESHOLD;
  }

  this.toVoltage = function ( bool ) {
    return ( bool ? 1 : 0 ) * this.TRUE_VOLTAGE:
  }
}