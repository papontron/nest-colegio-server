import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from './config/database/MongoDB.module';
import { Cors } from './config/middleware/Cors.middleware';
import { UserModule } from './config/modules/User/user.module';
import { ExtractNivelYearFromHeaders, VerifyCredentials } from './config/middleware/VerifyCredentials.middleware';
import { UserService } from './config/modules/User/user.service';
import { AlumnoModule } from './config/modules/Alumno/Alumno.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: ['.env'],
    }),
    MongoDBModule,
    UserModule,
    AlumnoModule,
  ],
  controllers: [AppController],
  providers: [AppService, VerifyCredentials],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Cors).forRoutes({ method: RequestMethod.ALL, path: '*' }).apply(ExtractNivelYearFromHeaders).exclude('/').forRoutes('*');
    // .apply(VerifyCredentials)
    // .exclude('/user/register')
    // .exclude('/')
    // .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
