export default {
  User: {
    async name(root, args, ctx) {
      return root.name;
    }
  }
};