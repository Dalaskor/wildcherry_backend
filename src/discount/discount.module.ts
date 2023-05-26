import { Discount, DiscountProducts, Product, User } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

@Module({
  providers: [DiscountService],
  controllers: [DiscountController],
  imports: [
    SequelizeModule.forFeature([Discount, User, Product, DiscountProducts]),
    UserModule,
    ProductModule,
    AbilityModule,
    forwardRef(() => AuthModule),
  ],
  exports: [DiscountService],
})
export class DiscountModule {}
