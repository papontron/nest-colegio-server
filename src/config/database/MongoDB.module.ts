import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MongoConnection from './MongoConfig';
import { MONGO_DB } from '../var/modulesTokens';

@Module({
  providers: [
    {
      provide: MONGO_DB,
      useFactory: MongoConnection,
      inject: [ConfigService], // this injects the config service into this module
    },
  ],
  exports: [MONGO_DB],
})
export class MongoDBModule {}
