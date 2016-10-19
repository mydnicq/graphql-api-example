export default {
  userResolvers: {
    Query: {
      async user(root, {name}, ctx) {
        return await ctx.appCtx.mongo.collection('users').findOne({name: name});
      },
      async users(root, args, ctx) {
        return await ctx.appCtx.mongo.collection('users').find().toArray();
      },
      async usersCount(root, args, ctx){
        let User = ctx.appCtx.getModel('User');
        return await User.count();
      }
    },
    User: {
      async name(root, args, ctx) {
        return root.name;
      }
    }
  }
};
