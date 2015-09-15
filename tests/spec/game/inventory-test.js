var Inventory = require('../../../src/game/inventory');

describe('inventory', function () {
  beforeEach(function () {
    this.inventory = new Inventory();
  });

  it('can add an item', function () {
    this.inventory.addItem( 'test', 'item' );

    var value = this.inventory.getItem( 'test' );

    expect( value ).toBe( 'item' );
  });

  it('can remove an item', function () {
    this.inventory.addItem( 'test', 'item' );
    this.inventory.removeItem( 'test' );

    var value = this.inventory.getItem( 'test' );

    expect( value ).toBe( null );
  });

  it('can remove an item that it has many of', function () {
    this.inventory.addItem( 'test', 'item1' );
    this.inventory.addItem( 'test', 'item2' );
    this.inventory.removeItem( 'test' );

    var value = this.inventory.getItem( 'test' );

    expect( value ).toBe( 'item1' );
  });

  it('can check if the inventory has an item', function () {
    this.inventory.addItem( 'yup', 'item' );

    var value_nope = this.inventory.hasItem( 'nope' );
    var value_yup  = this.inventory.hasItem( 'yup' );

    expect( value_nope ).toBe( false );
    expect( value_yup ).toBe( true );
  });

  it('can build an empty inventory', function () {
    var value = Inventory.buildEmpty();

    expect( value instanceof Inventory ).toBe( true );
  });

  it('can build a weapons inventory', function () {
    var value = Inventory.buildInitialWeapons();

    expect( value instanceof Inventory ).toBe( true );
  });

  it('can build a wepaons inventory that has weapons', function () {
    var value = Inventory.buildInitialWeapons();
    expect( value.hasItem( 'Phaser' ) ).toBe( true );
  });

  it('can check the size of the inventory', function () {
    var value = Inventory.buildInitialWeapons();

    expect( value.size() ).toBeGreaterThan( 0 );
  });
});
