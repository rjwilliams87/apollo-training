import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { createUserModel } from './user.js';
import { createPetModel } from './pet.js';

const adapter = new FileSync('server-start/db/db.json');
export const db = low(adapter);
export const models = {
  User: createUserModel(db),
  Pet: createPetModel(db),
};
