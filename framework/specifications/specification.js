var Class = require('../class/class');

module.exports = function Specification() {
  this.isSatisfiedBy = Class.abstractMethod;
};
