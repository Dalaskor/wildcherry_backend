import { Delivery, DeliveryProducts, Product, User } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  providers: [DeliveryService],
  controllers: [DeliveryController],
  imports: [
    SequelizeModule.forFeature([Delivery, User, Product, DeliveryProducts]),
  ],
  exports: [DeliveryService],
})
export class DeliveryModule {}
