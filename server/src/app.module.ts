import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraService } from './cassandra.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.string().required()
      }),
      validationOptions: {
        abortEarly: true,
      },
      ignoreEnvFile: true,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CassandraService, UserRepository],
})
export class AppModule {}
