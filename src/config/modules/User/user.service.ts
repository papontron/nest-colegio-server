import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, InsertOneResult, MongoClient, ObjectId, WithId } from 'mongodb';
import { MONGO_DB } from '../../var/modulesTokens';

@Injectable()
export class UserService {
  constructor(@Inject(MONGO_DB) private mongoClient: MongoClient) {}
  private parseId(id: string | ObjectId) {
    return id instanceof ObjectId ? id : new ObjectId(id);
  }
  findById(userId: string | ObjectId, nivel: Nivel): Promise<UserCredentials> {
    const collection = this.mongoClient.db().collection(`users${nivel}`);
    const user = collection.findOne<UserCredentials>({ _id: this.parseId(userId) }, { projection: { _id: 0, username: 1, password: 1 } });
    return user;
  }
  findByUsername(username: string, nivel: Nivel): Promise<WithId<UserCredentials>> {
    const collection = this.mongoClient.db().collection(`users${nivel}`);
    return collection.findOne<WithId<UserCredentials>>({ username });
  }
  insertNewUser(newUser: UserCredentials, nivel: Nivel): Promise<InsertOneResult<UserCredentials>> {
    const collection = this.mongoClient.db().collection(`users${nivel}`);
    return collection.insertOne({ ...newUser });
  }

  deleteUser(userId: string | ObjectId, nivel): Promise<DeleteResult> {
    const collection = this.mongoClient.db().collection(`users${nivel}`);
    return collection.deleteOne({ _id: this.parseId(userId) });
  }
}
