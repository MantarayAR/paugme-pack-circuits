function Component() {
  this.inputs = [];
  this.calculate = Class.abstractMethod;

  this.addInput = function ( component ) {
    this.inputs.push( component );
  }

  this.reset = function () {
    this.inputs = [];
  }
}