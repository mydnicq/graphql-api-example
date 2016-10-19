export const userMutationResolvers = {
  async createUser(root, {input}, ctx) {
    let User = ctx.appCtx.getModel('User');
    return await User.insert(input);
  }
};
