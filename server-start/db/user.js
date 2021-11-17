import { nanoid } from 'nanoid';

export const createUserModel = (db) => {
  return {
    find(args) {
      const [user] = db
        .get('users')
        .filter({ ...args })
        .take(1)
        .value();

      return user;
    },

    findOne() {
      return db.get('users').value();
    },

    create(user) {
      const dbUsers = db.get('users');
      const newUser = { id: nanoid(), createdAt: Date.now(), ...user };
      const newUsers = [...dbUsers, newUser];
      db.set('users', newUsers).write();

      return newUser;
    },

    update(id, user) {
      const updatedUser = db.get('users').filter({ id }).assign(user).value();

      return updatedUser;
    },
  };
};
