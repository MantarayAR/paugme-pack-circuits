var Point = require('../../framework/graph/point');
var Vector = require('../../framework/graph/vector');

describe('a point', function () {
  beforeEach(function () {
    this.point = new Point( 0, 0 );
  });

  it('has an x and y coordinate', function () {
    expect( this.point.x ).toBe( 0 );
    expect( this.point.y ).toBe( 0 );
  });

  it('can have a vector added to it', function () {
    var vector = new Vector();

    vector.setMagnitudeAndDirection( 1, 0 );

    this.point.add( vector );

    expect( this.point.x ).toBe( 1 );
    expect( this.point.y ).toBe( 0 );
  });
});
