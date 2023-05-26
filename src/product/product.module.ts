import {
  Cart,
  CartProducts,
  Delivery,
  DeliveryProducts,
  Discount,
  DiscountProducts,
  Favorite,
  FavoriteProducts,
  Product,
  Review,
  Specification,
  SubCategory,
  User,
} from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductImagesModule } from 'src/product_images/product-images.module';
import { SpecificationModule } from 'src/specification/specification.module';
import { SubCategoryModule } from 'src/subcategory/sub-category.module';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    SequelizeModule.forFeature([
      Product,
      User,
      Cart,
      CartProducts,
      Delivery,
      DeliveryProducts,
      Discount,
      DiscountProducts,
      Favorite,
      FavoriteProducts,
      Review,
      Specification,
      SubCategory,
    ]),
    UserModule,
    SubCategoryModule,
    SpecificationModule,
    ProductImagesModule,
    AbilityModule,
    forwardRef(() => AuthModule),
  ],
  exports: [ProductService],
})
export class ProductModule {}
