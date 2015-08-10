+new function NotGateTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new FalseLogicMockComponent();
  }

  this.testNotGateHasNoAbstractMethods = function () {
    var notGate = new NotGate();
    this.assertHasNoAbstractMethods( this.notGate );
  }

  this.testNotGateReturnsTrueWhenNoInputs = function () {
    var notGate = new NotGate();

    this.assertValueEqualsExpected( notGate.calculate(), 5, 'The not gate should return true when no inputs are given.' );
  }

  this.testNotGateReturnsTrue = function () {
    var notGate = new NotGate();

    notGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( notGate.calculate(), 5, 'The not gate should return true.' );
  }

  this.testNotGateReturnsFalse = function () {
    var notGate = new NotGate();

    notGate.addInput( this.trueMock );

    this.assertValueEqualsExpected( notGate.calculate(), 0, 'The not gate should return false.' );
  }

  this.testNotGateReturnsTrueAfterRemovingInput = function () {
    var notGate = new NotGate();

    notGate.addInput( this.trueMock );

    notGate.removeInput( 0 );

    this.assertValueEqualsExpected( notGate.calculate(), 5, 'The not gate should return true after removing input.' );
  }

  this.testNotGateReturnsTrueAfterReset = function () {
    var notGate = new NotGate();

    notGate.addInput( this.trueMock );

    notGate.reset();

    this.assertValueEqualsExpected( notGate.calculate(), 5, 'The not gate should return true after being reset.' );
  }

  this.testNotGateUnAffectedBySecondaryInputs = function () {
    var notGate = new NotGate();

    notGate.addInput( this.trueMock );
    notGate.addInput( this.falseMock );

    this.assertValueEqualsExpected( notGate.calculate(), 0, 'The not gate should be false. ' );

    notGate = new NotGate();

    notGate.addInput( this.trueMock );
    notGate.addInput( this.trueMock );

    this.assertValueEqualsExpected( notGate.calculate(), 0, 'The not gate should be false. ' );
  }
}