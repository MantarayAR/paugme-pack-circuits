+new function AndGateTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new FalseLogicMockComponent();
  }

  this.testAndGateHasNoAbstractMethods = function () {
    var andGate = new AndGate();
    this.assertHasNoAbstractMethods( this.andGate );
  }

  this.testAndGateReturnsTrueWhenNoInputsGiven = function () {
    var andGate = new AndGate();

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true when no inputs given.' );
  }

  this.testAndGateReturnsTrue = function () {
    var andGate = new AndGate();

    andGate.addInput( this.trueMock );
    andGate.addInput( this.trueMock );

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true.' );
  }

  this.testAndGateReturnsTrueWithManyInput = function () {
    var andGate = new AndGate();

    andGate.addInput( this.trueMock );
    andGate.addInput( this.trueMock );
    andGate.addInput( this.trueMock );
    andGate.addInput( this.trueMock );

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true.' );
  }

  this.testAndGateReturnsFalse = function () {
    var andGate = new AndGate();

    andGate.addInput( this.trueMock );
    andGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( andGate.calculate(), 0, 'The and gate should return false.' );
  }

  this.testAndGateReturnsTrueWhenReset = function () {
    var andGate = new AndGate();

    andGate.addInput( this.falseMock );
    andGate.addInput( this.falseMock );

    andGate.reset();

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true.' );
  }

  this.testAndGateReturnsTrueWhenRemovingInputs = function () {
    var andGate = new AndGate();

    andGate.addInput( this.trueMock );
    andGate.addInput( this.falseMock );

    andGate.removeInput( 1 );

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true after removing false input.' );
  }

  this.testAndGateReturnsFalseWhenRemovingInputs = function () {
    var andGate = new AndGate();

    andGate.addInput( this.trueMock );
    andGate.addInput( this.falseMock );

    andGate.removeInput( 0 );

    this.assertValueEqualsExpected( andGate.calculate(), 0, 'The and gate should return false after removing true input.' );
  }
}();