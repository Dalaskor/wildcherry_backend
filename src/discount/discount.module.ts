import { Discount, DiscountProducts, Product, User } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

@Module({
  providers: [DiscountService],
  controllers: [DiscountController],
  imports: [
    SequelizeModule.forFeature([Discount, User, Product, DiscountProducts]),
  ],
  exports: [DiscountService],
})
export class DiscountModule {}
