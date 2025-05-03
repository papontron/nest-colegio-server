import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { parseIdToObjectId } from 'src/config/util/parser';
import { MONGO_DB } from 'src/config/var/modulesTokens';

@Injectable()
export class AlumnoService {
  constructor(@Inject(MONGO_DB) private mongoClient: MongoClient) {}
  getById({ nivel, year, _id }: { nivel: Nivel; year: Year; _id: string | ObjectId }) {
    const response = this.mongoClient
      .db()
      .collection(`matriculados${nivel}${year}`)
      .findOne({ _id: parseIdToObjectId(_id) });
    return response;
  }
  findByNombreCompleto({ nivel, year, nombreCompleto }) {
    const response = this.mongoClient
      .db()
      .collection(`matriculados${nivel}${year}`)
      .find({ $text: { $search: nombreCompleto } });
    return response;
  }
}
