'use strict';

const Exception = require('./Exception');

class NotFound extends Exception {
  constructor(msg) {
    super(msg);
    this.status = 404;
  }
}

module.exports = NotFound;
