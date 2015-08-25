var Class     = require('../../framework/class/class');
var Component = require('../../framework/components/component');
var Gate      = require('../../framework/components/gate');

/**
 * Contains mock components for testing
 * true, false, and edge cases.
 */

exports.TrueLogicMockComponent = function() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.TRUE_VOLTAGE;
  }
}

exports.FalseLogicMockComponent = function() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.FALSE_VOLTAGE;
  }
}

exports.FalseBoundaryMockCompnent = function() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    return this.logicHandler.TRUE_VOLTAGE_THRESHOLD - this.logicHandler.VOLTAGE_TOLERANCE;
  }
}

exports.NegativeVoltageMockComponent = function() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return -1;
  }
}

exports.HighVoltageMockComponent = function() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return 1000;
  }
}
