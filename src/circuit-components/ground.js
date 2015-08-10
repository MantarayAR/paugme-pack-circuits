function Ground() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    var maxValue = Number.NEGATIVE_INFINITY;
    for ( var i = 0; i < this.inputs.length; i++ ) {
      var currentValue = this.inputs[0].calculate();

      if ( currentValue > maxValue ) {
        maxValue = currentValue;
      }
    }
    return maxValue;
  }
}