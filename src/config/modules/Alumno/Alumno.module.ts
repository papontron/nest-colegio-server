import { Module } from '@nestjs/common';
import { AlumnoService } from './Alumno.service';
import { MongoDBModule } from 'src/config/database/MongoDB.module';
import { AlumnoController } from './Alumno.controller';

@Module({
  imports: [MongoDBModule],

  providers: [AlumnoService],
  controllers: [AlumnoController],
  exports: [AlumnoService],
})
export class AlumnoModule {}
