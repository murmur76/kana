'use strict';

const supertest = require('supertest');
const express = require('express');
const app = express();
const assert = require('assert');
const Router = require('../../lib/router');

describe('router', () => {
  describe('#bindRoute', () => {
    before((done) => {
      Router.bindRoute(app);
      app.listen(3000, () => done());
    });

    it('should bind route with GET method and correct action', (done) => {
      supertest(app).get('/test').expect((res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body, 'index');
      })
      .end(done);
    });

    it('should bind route with POST method and correct action', (done) => {
      supertest(app).post('/test').expect((res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body, 'create');
      })
      .end(done);
    });

    it('should bind route with PUT method and correct action', (done) => {
      supertest(app).put('/test').expect((res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body, 'update');
      })
      .end(done);
    });

    it('should bind route with DELETE method and correct action', (done) => {
      supertest(app).del('/test').expect((res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body, 'remove');
      })
      .end(done);
    });
  });
});
