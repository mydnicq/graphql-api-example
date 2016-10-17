import userResolvers from './user';

const queryResolvers = {
  Query: {
    async user(root, {name}, ctx) {
      let collection = ctx.http.db.collection('users');
		  return await collection.findOne({name: name});
    },
    async users(root, args, ctx) {
      let collection = ctx.http.db.collection('users');
		  return await collection.find().toArray();
    }
  }
};

const allResolvers = Object.assign({}, queryResolvers,  userResolvers);

export default allResolvers;