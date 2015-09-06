var Class = require('../class/class');

module.exports = function Factory() {
  this.build = Class.abstractMethod;
};
