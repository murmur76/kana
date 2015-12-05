'use strict';

const assert = require('assert');
const Exception = require('../../lib/exception/Exception');
const BadRequest = require('../../lib/exception/BadRequest');
const NotFound = require('../../lib/exception/NotFound');
const Forbidden = require('../../lib/exception/Forbidden');
const InternalError = require('../../lib/exception/InternalError');

describe('exception', () => {
  describe('#Exception', () => {
    it('should create instance of Exception with message', (done) => {
      let exception = new Exception('Exception');
      assert.equal(exception.message, 'Exception');
      done();
    });
  });

  describe('#BadRequest', () => {
    it('should create instance of BadRequest with status and message', (done) => {
      let badRequest = new BadRequest('BadRequest');
      assert.equal(badRequest.status, 400);
      assert.equal(badRequest.message, 'BadRequest');
      done();
    });

    it('created instance of BadRequest should also be an instance of Exception', (done) => {
      let badRequest = new BadRequest('BadRequest');
      assert.equal(badRequest instanceof Exception, true);
      done();
    });
  });

  describe('#NotFound', () => {
    it('should create instance of NotFound with status and message', (done) => {
      let notFound = new NotFound('NotFound');
      assert.equal(notFound.status, 404);
      assert.equal(notFound.message, 'NotFound');
      done();
    });

    it('created instance of NotFound should also be an instance of Exception', (done) => {
      let notFound = new NotFound('NotFound');
      assert.equal(notFound instanceof Exception, true);
      done();
    });
  });

  describe('#Forbidden', () => {
    it('should create instance of Forbidden with status and message', (done) => {
      let forbidden = new Forbidden('Forbidden');
      assert.equal(forbidden.status, 403);
      assert.equal(forbidden.message, 'Forbidden');
      done();
    });

    it('created instance of Forbidden should also be an instance of Exception', (done) => {
      let forbidden = new Forbidden('Forbidden');
      assert.equal(forbidden instanceof Exception, true);
      done();
    });
  });

  describe('#InternalError', () => {
    it('should create instance of InternalError with status and message', (done) => {
      let internalError = new InternalError('InternalError');
      assert.equal(internalError.status, 500);
      assert.equal(internalError.message, 'InternalError');
      done();
    });

    it('created instance of InternalError should also be an instance of Exception', (done) => {
      let internalError = new InternalError('InternalError');
      assert.equal(internalError instanceof Exception, true);
      done();
    });
  });
});
