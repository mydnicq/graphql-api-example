import {userMutationResolvers} from './user';
import {restaurantMutationResolvers} from './restaurant';

const allResolvers = Object.assign({},
  userMutationResolvers,
  restaurantMutationResolvers
);

const mutationResolvers = {
  Mutation: {}
};

for (let key in allResolvers){
  mutationResolvers.Mutation[key] = allResolvers[key];
}

export default mutationResolvers;
