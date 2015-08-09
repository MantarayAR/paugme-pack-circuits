+new function AndGateTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new FalseLogicMockComponent();
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
}();