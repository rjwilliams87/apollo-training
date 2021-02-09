export const resolvers = {
  User: {
    pets(root, args, context) {
      const { id } = root;
      const pets = context.models.Pet.findMany({ userId: id });
      return pets;
    },
  },
  Query: {
    user(root, args, context) {
      const user = context.models.User.find({ id: args.id });
      return user;
    },
    pet(root, args, context) {
      const pet = context.models.Pet.findOne({ id: args.id });
      return pet;
    },
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
    createPet(root, args, context, info) {
      const { props } = args;
      const pet = context.models.Pet.create(props);
      return pet;
    },
    updatePet(root, args, context, info) {
      const { id, props } = args;
      const pet = context.models.Pet.update(id, props);
      return pet;
    },
    deletePet(root, args, context, info) {
      const { id } = args;
      return context.models.Pet.delete(id);
    },
    login(root, args, context, info) {
      const { username, password } = args;
      const user = context.models.User.find({ username, password });

      if (!user) throw new Error('unauthorized');
      return user.id;
    },
  },
};
