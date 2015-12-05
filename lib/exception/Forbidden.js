'use strict';

const Exception = require('./Exception');

class Forbidden extends Exception {
  constructor(msg) {
    super(msg);
    this.status = 403;
  }
}

module.exports = Forbidden;
