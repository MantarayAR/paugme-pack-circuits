function OneTerminalVoltageSource() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.TRUE_VOLTAGE;
  }
}