import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as Joi from 'joi';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { SpecificationModule } from './specification/specification.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    ProfileModule,
    ProductModule,
    SpecificationModule,
  ],
})
export class AppModule {}
