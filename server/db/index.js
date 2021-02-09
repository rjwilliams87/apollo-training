import low from 'lowdb';
import FileSync from '../../node_modules/lowdb/adapters/FileSync.js';

import { createUserModel } from './user.js';
import { createPetModel } from './pet.js';

const adapter = new FileSync('server/db/db.json');
export const db = low(adapter);
export const models = {
  User: createUserModel(db),
  Pet: createPetModel(db),
};
