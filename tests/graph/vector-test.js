var Vector = require('../../framework/graph/vector');
var Point  = require('../../framework/graph/point');

describe('a vector', function () {
  it('can be initialized with no data', function () {
    var vector = new Vector();

    expect( vector.x ).toBeCloseTo( 0 );
    expect( vector.y ).toBeCloseTo( 0 );
  });

  it('can be initialized with data', function () {
    var vector = new Vector(1,2);

    expect( vector.x ).toBeCloseTo( 1 );
    expect( vector.y ).toBeCloseTo( 2 );
  });

  it('can have its data set', function () {
    var vector = new Vector();
    
    vector.setPoint( 1, 2 );

    expect( vector.x ).toBeCloseTo( 1 );
    expect( vector.y ).toBeCloseTo( 2 );
  });

  it('can have its data set as a point', function () {
    var vector = new Vector();

    vector.setPoint( new Point( 1, 2 ) );

    expect( vector.x ).toBeCloseTo( 1 );
    expect( vector.y ).toBeCloseTo( 2 );
  });

  it('can have its point set as a magnitude and direction', function () {
    var vector = new Vector();

    vector.setMagnitudeAndDirection(
        5,
        90
    );

    expect( vector.x ).toBeCloseTo( 0 );
    expect( vector.y ).toBeCloseTo( 5 );
  });
});
