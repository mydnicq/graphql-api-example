'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _restaurant = require('./restaurant');

const allResolvers = Object.assign({}, _user.userMutationResolvers, _restaurant.restaurantMutationResolvers);

const mutationResolvers = {
  Mutation: {}
};

for (let key in allResolvers) {
  if ({}.hasOwnProperty.call(allResolvers, key)) {
    mutationResolvers.Mutation[key] = allResolvers[key];
  }
}

exports.default = mutationResolvers;