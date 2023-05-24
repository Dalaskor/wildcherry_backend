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
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
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
  ],
  exports: [ProductService],
})
export class ProductModule {}
