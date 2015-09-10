var Item = require('../../src/game/item');

describe('an item', function () {
  it('has a name', function() {
    var item = new Item();

    expect( item.name ).toBe( 'na' );
  });
});
