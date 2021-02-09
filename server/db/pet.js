import { nanoid } from 'nanoid';

export const createPetModel = (db) => {
  return {
    findMany(filter) {
      return db
        .get('pets')
        .filter(filter)
        .orderBy(['createdAt'], ['desc'])
        .value();
    },

    findOne(filter) {
      return db.get('pets').find(filter).value();
    },

    create(props) {
      console.log('pet = ', props);
      const pets = db.get('pets').value();
      console.log('pets = ', pets);
      const pet = { id: nanoid(), createdAt: Date.now(), ...props };
      const newPets = [...pets, pet];

      db.set('pets', newPets).write();

      return pet;
    },

    update(id, props) {
      const pets = db
        .get('pets')
        .value()
        .filter((pet) => pet.id !== id);
      const newPet = { id, ...props };
      const newPets = [...pets, newPet];

      db.set('pets', newPets).write();

      return newPet;
    },

    delete(id) {
      const pets = db
        .get('pets')
        .value()
        .filter((pet) => pet.id !== id);

      db.set('pets', pets).write();

      return id;
    },
  };
};
