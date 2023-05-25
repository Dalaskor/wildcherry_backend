import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { DeliveryModule } from './delivery/delivery.module';
import { DiscountModule } from './discount/discount.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ProductModule } from './product/product.module';
import { ProductImagesModule } from './product_images/product-images.module';
import { ProfileModule } from './profile/profile.module';
import { ReviewModule } from './review/review.module';
import { RoleModule } from './role/role.module';
import { SpecificationModule } from './specification/specification.module';
import { SubCategoryModule } from './subcategory/sub-category.module';
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
    AuthModule,
    RoleModule,
    UserModule,
    ProfileModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    SpecificationModule,
    ProductImagesModule,
    ReviewModule,
    DiscountModule,
    CartModule,
    FavoriteModule,
    DeliveryModule,
  ],
})
export class AppModule {}
