'use strict';

const _ = require('lodash');
const co = require('co');

module.exports = {
  generatorToCallback: function (action) {
    return function (req, res, next) {
      let params = _.extend(_.clone(req.body), req.params, req.query);
      let context = { req: req, res: res };
      return co.wrap(action).call(context, params)
      .then((result) => res.send(result))
      .catch(next);
    };
  }
};
