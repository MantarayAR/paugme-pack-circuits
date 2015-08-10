+new function OneTerminalVoltageSourceTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.voltageSource = new OneTerminalVoltageSource();
  }

  this.testSourceHasNoAbstractMethods = function () {
    this.assertHasNoAbstractMethods( this.voltageSource );
  }

  this.testSourceIsFiveVolts = function () {
    var voltage = this.voltageSource.calculate();

    this.assertValueEqualsExpected( voltage, 5, 'The voltage source should always be 5 volts.' );
  }
};
