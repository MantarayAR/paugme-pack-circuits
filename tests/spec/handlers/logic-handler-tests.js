var LogicHandler = require('../../../src/handlers/logic-handler');

describe('the logic handler', function () {
  it('correctly map booleans', function () {
    var data;
    var logicHandler = new LogicHandler();

    data = logicHandler.toBoolean( 5 );
    expect( data ).toEqual( true );

    data = logicHandler.toBoolean( 4 );
    expect( data ).toEqual( true );

    data = logicHandler.toBoolean( 1000 );
    expect( data ).toEqual( true );

    data = logicHandler.toBoolean( 2.5 + logicHandler.VOLTAGE_TOLERANCE );
    expect( data ).toEqual( false );

    data = logicHandler.toBoolean( 2.5 );
    expect( data ).toEqual( false );

    data = logicHandler.toBoolean( 1 );
    expect( data ).toEqual( false );

    data = logicHandler.toBoolean( 0 );
    expect( data ).toEqual( false );
  });

  it('correctly maps voltages', function () {
    var data;
    var logicHandler = new LogicHandler();

    data = logicHandler.toVoltage( true );
    expect( data ).toEqual( 5 );

    data = logicHandler.toVoltage( false );
    expect( data ).toEqual( 0 );
  });
});
