+new function OrGateTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new TrueLogicMockComponent();
  }

  this.testOrGateReturnsFalseWhenNoInputs = function () {
    var orGate = new OrGate();

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false' );
  }

  this.testOrGateReturnsTrue = function () {
    var orGate = new OrGate();

    orGate.addInput( this.trueMock );
    orGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( orGate.calculate(), 5, 'The or gate should return true' );
  }

  this.testOrGateReturnsTrueWithManyInput = function () {
    var orGate = new OrGate();

    orGate.addInput( this.falseMock );
    orGate.addInput( this.falseMock );
    orGate.addInput( this.falseMock );
    orGate.addInput( this.trueMock );
    orGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( orGate.calculate(), 5, 'The or gate should return true' );
  }

  this.testOrGateReturnsFalse = function () {
    var orGate = new OrGate();

    orGate.addInput( this.falseMock );
    orGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false' );
  }

  this.testOrGateReturnsFalseAfterResetting = function () {
    var orGate = new OrGate();

    orGate.addInput( this.trueMock );
    orGate.addInput( this.trueMock );

    orGate.reset();

    this.assertValueEqualsExpected( orGate.calculate(), 0, 'The or gate should return false' );
  }
}();
