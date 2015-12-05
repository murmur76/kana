'use strict';

const _ = require('lodash');
const assert = require('assert');
const Fun = require('../../lib/function');

describe('function', () => {
  let req = {
    body: { firstName: 'First', lastName: 'Last' },
    params: { userId: 1 },
    query: { age: 21 }
  };
  let res = { json: _.identity };
  let next = () => {};

  describe('#generatorToCallback', () => {
    it('should convert generator function to callback function', (done) => {
      let generatorFunc = function* (params) {
        return yield Promise.resolve(params);
      };
      Fun.generatorToCallback(generatorFunc)(req, res, next).then((result) => {
        assert.deepEqual(result, _.extend(_.clone(req.body), req.params, req.query));
        done();
      });
    });

    it('should encapsulate express request object into context', (done) => {
      let generatorFunc = function* () {
        return yield Promise.resolve(this.req);
      };
      Fun.generatorToCallback(generatorFunc)(req, res, next).then((result) => {
        assert.deepEqual(result, req);
        done();
      });
    });

    it('should encapsulate express response object into context', (done) => {
      let generatorFunc = function* () {
        return yield Promise.resolve(this.res);
      };
      Fun.generatorToCallback(generatorFunc)(req, res, next).then((result) => {
        assert.deepEqual(result, res);
        done();
      });
    });

    it('should catch error in generator function', (done) => {
      let generatorFunc = function* () {
        return yield Promise.reject('Error');
      };
      Fun.generatorToCallback(generatorFunc)(req, res, _.identity).then((result) => {
        assert.equal(result, 'Error');
        done();
      });
    });
  });
});
