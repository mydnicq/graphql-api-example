import userResolvers from './user';
import restaurantResolvers from './restaurant';

const mergedResolvers = Object.assign({},
  userResolvers,
  restaurantResolvers
);

const allResolvers = {
  Query: {},
};

for (let key in mergedResolvers) {
  if ({}.hasOwnProperty.call(mergedResolvers, key)) {
    let currentResolver = mergedResolvers[key];
    if (currentResolver.Query) {
      Object.assign(allResolvers.Query, currentResolver.Query);
      delete currentResolver.Query;
    }
    Object.assign(allResolvers, currentResolver);
  }
}

export default allResolvers;
