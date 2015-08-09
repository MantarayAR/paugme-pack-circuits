/**
 * Class that handles determining
 * voltage to boolean and boolean
 * to voltage calculations.
 *
 * The Hanlder implements the Gate
 * class in order to use the
 * TRUE_VOLTAGE and FALSE_VOLTAGE
 * constants.
 *
 * @implements Handler
 * @implements Gate
 */
function LogicHandler() {
  this.Class.implement( Handler, this );
  this.Class.implement( Gate, this );

  this.TRUE_VOLTAGE_FACTOR    = 0.5;
  this.TRUE_VOLTAGE_THRESHOLD = this.TRUE_VOLTAGE * this.TRUE_VOLTAGE_FACTOR;
  this.VOLTAGE_TOLERANCE      = Math.pow( 10, -20 );

  this.toBoolean = function ( voltage ) {
    return voltage > this.TRUE_VOLTAGE_THRESHOLD;
  }

  this.toVoltage = function ( bool ) {
    return ( bool ? 1 : 0 ) * this.TRUE_VOLTAGE;
  }
}