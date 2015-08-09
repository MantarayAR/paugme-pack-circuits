/**
 * Contains mock components for testing
 * true, false, and edge cases.
 */

function TrueLogicMockComponent() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.TRUE_VOLTAGE;
  }
}

function FalseLogicMockComponent() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return this.FALSE_VOLTAGE;
  }
}

function FalseBoundaryMockCompnent() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.logicHandler = new LogicHandler();

  this.calculate = function () {
    return this.logicHandler.TRUE_VOLTAGE_THRESHOLD - this.logicHandler.VOLTAGE_TOLERANCE;
  }
}

function NegativeVoltageMockComponent() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return -1;
  }
}

function HighVoltageMockComponent() {
  this.Class.extend( Component, this );
  this.Class.implement( Gate, this );

  this.calculate = function () {
    return 1000;
  }
}