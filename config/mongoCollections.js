import { dbConnection } from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const patients = getCollectionFn('patients');
export const prescriptions = getCollectionFn('prescriptions');
export const users = getCollectionFn('users');
export const drugs = getCollectionFn('drugs');
