+new function LogicHandlerTests() {
  isAUnitTest.call( this );

  this.setup = function () {
    this.logicHandler = new LogicHandler();
  }

  this.testLogicHandlerCorrectlyMapsBooleans = function () {
    var data;

    data = this.logicHandler.toBoolean( 5 );
    this.assertValueEqualsExpected( data, true );

    data = this.logicHandler.toBoolean( 4 );
    this.assertValueEqualsExpected( data, true );

    data = this.logicHandler.toBoolean( 1000 );
    this.assertValueEqualsExpected( data, true );

    data = this.logicHandler.toBoolean( 2.5 + this.logicHandler.VOLTAGE_TOLERANCE );
    this.assertValueEqualsExpected( data, false );

    data = this.logicHandler.toBoolean( 2.5 );
    this.assertValueEqualsExpected( data, false );

    data = this.logicHandler.toBoolean( 1 );
    this.assertValueEqualsExpected( data, false );

    data = this.logicHandler.toBoolean( 0 );
    this.assertValueEqualsExpected( data, false );
  }

  this.testLogicHandlerCorrectlyMapsVoltages = function () {
    var data;

    data = this.logicHandler.toVoltage( true );
    this.assertValueEqualsExpected( data, 5 );

    data = this.logicHandler.toVoltage( false );
    this.assertValueEqualsExpected( data, 0 );
  }
}