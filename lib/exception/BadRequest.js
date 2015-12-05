'use strict';

const Exception = require('./Exception');

class BadRequest extends Exception {
  constructor(msg) {
    super(msg);
    this.status = 400;
  }
}

module.exports = BadRequest;
