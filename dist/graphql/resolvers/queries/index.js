'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _restaurant = require('./restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mergedResolvers = Object.assign({}, _user2.default, _restaurant2.default);

const allResolvers = {
  Query: {}
};

for (let key in mergedResolvers) {
  let currentResolver = mergedResolvers[key];
  if (currentResolver.Query) {
    Object.assign(allResolvers.Query, currentResolver.Query);
    delete currentResolver.Query;
  }
  Object.assign(allResolvers, currentResolver);
}

exports.default = allResolvers;