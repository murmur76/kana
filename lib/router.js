'use strict';

const _ = require('lodash');
const Fun = require('./function');
const pathToControllers = process.env.NODE_ENV === 'test' ? '../test/fixtures/controllers/' : '../../app/controllers/';
const pathToRouteConfig = process.env.NODE_ENV === 'test' ? '../test/fixtures/config/routes' : '../config/routes';
const routes = require(pathToRouteConfig);

module.exports = {
  bindRoute: function (app) {
    let routesGroupedByController = _.transform(routes, (result, value, key) => {
      let controller = value.split('.')[0];
      let action = value.split('.')[1];
      let method = key.split(' ')[0];
      let path = key.split(' ')[1];
      let route = {
        method: method,
        path: path,
        action: require(pathToControllers + controller)[action]
      };

      if (_.isArray(result[controller])) {
        result[controller].push(route);
      } else {
        result[controller] = [route];
      }
      return result;
    });

    _.forIn(routesGroupedByController, (routeConfigs) => {
      routeConfigs.forEach((config) => {
        app[config.method](config.path, Fun.generatorToCallback(config.action));
      });
    });
  }
};
