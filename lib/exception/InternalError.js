'use strict';

const Exception = require('./Exception');

class InternalError extends Exception {
  constructor(msg) {
    super(msg);
    this.status = 500;
  }
}

module.exports = InternalError;
