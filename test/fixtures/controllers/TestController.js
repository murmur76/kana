'use strict';

module.exports = {
  index: function* () {
    return yield Promise.resolve('index');
  },

  create: function* () {
    return yield Promise.resolve('create');
  },

  update: function* () {
    return yield Promise.resolve('update');
  },

  remove: function* () {
    return yield Promise.resolve('remove');
  }
};
