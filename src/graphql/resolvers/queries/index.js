const { userResolvers } = require('./user');
const { restaurantResolvers } = require('./restaurant');

const mergedResolvers = Object.assign({},
  userResolvers,
  restaurantResolvers
);

const queryResolvers = {
  Query: {},
};

for (let key in mergedResolvers) {
  if ({}.hasOwnProperty.call(mergedResolvers, key)) {
    let currentResolver = mergedResolvers[key];
    if (currentResolver.Query) {
      Object.assign(queryResolvers.Query, currentResolver.Query);
      delete currentResolver.Query;
    }
    Object.assign(queryResolvers, currentResolver);
  }
}

exports.queryResolvers = queryResolvers;
