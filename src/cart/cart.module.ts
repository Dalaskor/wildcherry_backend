import { Cart, CartProducts, Product, User } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [
    SequelizeModule.forFeature([Cart, User, Product, CartProducts]),
    ProductModule,
    AbilityModule,
    forwardRef(() => AuthModule),
  ],
  exports: [CartService],
})
export class CartModule {}
