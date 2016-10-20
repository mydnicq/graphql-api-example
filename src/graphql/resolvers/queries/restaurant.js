export default {
  restaurantResolvers: {
    Query: {
      async restaurant(root, {name}, ctx ) {
        return await ctx.appCtx.mongo.collection('restaurants').findOne({'name': name});
      },
      async restaurantCount(root, args, ctx) {
        let Restaurant = ctx.appCtx.getModel('Restaurant');
        return await Restaurant.count();
      }
    },
    Restaurant: {
      async name(root, args, ctx) {
        // Here you can manipulate field value before it is returned to the client
        return root.name;
      }
    }
  }
};
