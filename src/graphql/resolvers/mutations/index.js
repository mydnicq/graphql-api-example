const { userMutationResolvers } = require('./user');
const { restaurantMutationResolvers } = require('./restaurant');

const allResolvers = Object.assign({},
  userMutationResolvers,
  restaurantMutationResolvers
);

const mutationResolvers = {
  Mutation: {},
};

for (let key in allResolvers) {
  if ({}.hasOwnProperty.call(allResolvers, key)) {
    mutationResolvers.Mutation[key] = allResolvers[key];
  }
}

exports.mutationResolvers = mutationResolvers;
