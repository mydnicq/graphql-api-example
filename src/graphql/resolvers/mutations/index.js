const mutationResolvers = {
  Mutation: {
    async createUser(root, {input}, ctx) {
      let collection = ctx.http.db.collection('users');
		  let result = await collection.insertOne(input);
      return await collection.findOne({'_id': result.insertedId});
    }
  }
};

const allResolvers = Object.assign({}, mutationResolvers);

export default allResolvers;