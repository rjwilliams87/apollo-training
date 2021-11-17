export const resolvers = {
  User: {
    pets(root, args, context) {},
  },
  Query: {
    user(root, args, context) {
      const user = context.models.User.find({ id: args.id });
      return user;
    },
    pet(root, args, context) {},
  },
  Mutation: {
    createUser(root, args, context, info) {
      const { props } = args;
      const user = context.models.User.create(props);
      return user;
    },
    updateUser(root, args, context, info) {
      const { id, props } = args;
      const user = context.models.User.update(id, props);
      return user;
    },
    createPet(root, args, context, info) {},
    updatePet(root, args, context, info) {},
    login(root, args, context, info) {
      const { username, password } = args;
      const user = context.models.User.find({ username, password });

      if (!user) throw new Error('unauthorized');
      return user.id;
    },
  },
};
