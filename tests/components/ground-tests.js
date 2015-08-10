+new function GroundTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.trueMock = new TrueLogicMockComponent();
    this.falseMock = new FalseLogicMockComponent();
  }

  this.testGroundHasNoAbstractMethods = function () {
    this.assertHasNoAbstractMethods( this.ground );
  }

  this.testGroundPassesVoltage = function() {
    var ground = new Ground();
    ground.addInput( this.trueMock );
    this.assertValueEqualsExpected( ground.calculate(), 5 );

    ground = new Ground();
    ground.addInput( this.falseMock );
    this.assertValueEqualsExpected( ground.calculate(), 0 );
  }

  this.testGroundPassesMaxVoltage = function () {
    var ground = new Ground();
    ground.addInput( this.trueMock );
    ground.addInput( this.falseMock );
    this.assertValueEqualsExpected( ground.calculate(), 5 );
  }
}