import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongoDBModule } from '../../database/MongoDB.module';
import { UserController } from './user.controller';

@Module({
  imports: [MongoDBModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
