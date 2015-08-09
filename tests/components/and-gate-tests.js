+new function AndGateTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new TrueLogicMockComponent();
  }

  this.testAndGateReturnsTrue = function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( trueMock );

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true' );
  }

  this.testAndGateReturnsTrueWithManyInput = function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( trueMock );
    andGate.addInput( trueMock );
    andGate.addInput( trueMock );

    this.assertValueEqualsExpected( andGate.calculate(), 5, 'The and gate should return true' );
  }

  this.testAndGateReturnsFalse = function () {
    var andGate = new AndGate();

    andGate.addInput( trueMock );
    andGate.addInput( falseMock );

    this.assertValueEqualsExpected( andGate.calculate(), 0, 'The and gate should return false' );
  }
}();