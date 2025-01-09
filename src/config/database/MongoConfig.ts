import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

const MongoConnection = async (config: ConfigService) => {
  const uri = process.env.MONGO_URI || config.get('MONGO_URI');
  const client = await new MongoClient(uri).connect();
  return client;
};

export default MongoConnection;
