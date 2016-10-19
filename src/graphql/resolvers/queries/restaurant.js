export default {
  restaurantResolvers: {
    Query: {
      async restaurantCount(root, {name}, ctx) {
        let Restaurant = ctx.appCtx.getModel('Restaurant');
        return await Restaurant.count();
      }
    },
    Restaurant: {
      async name(root, args, ctx) {
        return root.name;
      }
    }
  }
};
