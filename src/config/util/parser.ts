import { ObjectId } from 'mongodb';

export function parseIdToObjectId(id: string | ObjectId) {
  if (typeof id === 'string') {
    return new ObjectId(id);
  }
  return id;
}
