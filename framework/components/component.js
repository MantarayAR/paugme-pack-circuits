function Component() {
  this.inputs = [];
  this.calculate = Class.abstractMethod;

  this.addInput = function ( component ) {
    this.inputs.push( component );
  }

  this.removeInput = function ( index ) {
    this.inputs.splice( index, 1 );
  }

  this.reset = function () {
    this.inputs = [];
  }
}