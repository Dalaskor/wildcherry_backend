import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_URI: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('POSTGRES_URI'),
          dialect: 'postgres',
          models: [],
          autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
