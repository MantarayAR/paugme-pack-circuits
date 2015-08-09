+new function OrGateTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new FalseLogicMockComponent();
  }

  this.testOrGateReturnsFalseWhenNoInputs = function () {
    var orGate = new OrGate();

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false when no inputs given.' );
  }

  this.testOrGateReturnsTrue = function () {
    var orGate = new OrGate();

    orGate.addInput( this.trueMock );
    orGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( orGate.calculate(), 5, 'The or gate should return true.' );
  }

  this.testOrGateReturnsTrueWithManyInput = function () {
    var orGate = new OrGate();

    orGate.addInput( this.falseMock );
    orGate.addInput( this.falseMock );
    orGate.addInput( this.falseMock );
    orGate.addInput( this.trueMock );
    orGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( orGate.calculate(), 5, 'The or gate should return true.' );
  }

  this.testOrGateReturnsFalse = function () {
    var orGate = new OrGate();

    orGate.addInput( this.falseMock );
    orGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false.' );
  }

  this.testOrGateReturnsFalseAfterResetting = function () {
    var orGate = new OrGate();

    orGate.addInput( this.trueMock );
    orGate.addInput( this.trueMock );

    orGate.reset();

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false after being reset.' );
  }

  this.testOrGateReturnsTrueWhenRemovingInputs = function () {
    var orGate = new OrGate();

    orGate.addInput( this.trueMock );
    orGate.addInput( this.falseMock );

    orGate.removeInput( 1 );

    this.assertValueEqualsExpected( orGate.calculate(), 5, 'The or gate should return true after removing false input.' );
  }

  this.testAndGateReturnsFalseWhenRemovingInputs = function () {
    var orGate = new OrGate();

    orGate.addInput( this.trueMock );
    orGate.addInput( this.falseMock );

    orGate.removeInput( 0 );

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false after removing true input.' );
  }
}();
