export const restaurantMutationResolvers = {
  async createRestaurant(root, { input }, ctx) {
    let Restaurant = ctx.appCtx.getModel('Restaurant');
    return await Restaurant.create(input);
  }
};
