var Handler = require('../../framework/handlers/handler');
var Gate    = require('../../framework/components/gate');

/**
 * Class that handles determining
 * voltage to boolean and boolean
 * to voltage calculations.
 *
 * @implements Handler
 * @implements Gate
 */
module.exports = function LogicHandler() {
  this.Class.implement( Handler, this );
  this.Gate = new Gate();

  this.TRUE_VOLTAGE_FACTOR    = 0.5;
  this.TRUE_VOLTAGE_THRESHOLD = this.Gate.TRUE_VOLTAGE * this.TRUE_VOLTAGE_FACTOR;
  this.VOLTAGE_TOLERANCE      = Math.pow( 10, -20 );

  this.toBoolean = function ( voltage ) {
    return voltage > this.TRUE_VOLTAGE_THRESHOLD;
  }

  this.toVoltage = function ( bool ) {
    return ( bool ? 1 : 0 ) * this.Gate.TRUE_VOLTAGE;
  }
}