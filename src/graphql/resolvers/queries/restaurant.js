export default {
  restaurantResolvers: {
    Query: {
      async restaurant(root, {name}, ctx) {
        return await ctx.appCtx.mongo.collection('users').findOne({name: name});
      }
    },
    Restaurant: {
      async name(root, args, ctx) {
        return root.name;
      }
    }
  }
};
