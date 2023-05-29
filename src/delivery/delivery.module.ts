import { Delivery, DeliveryProducts, Product, User } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  providers: [DeliveryService],
  controllers: [DeliveryController],
  imports: [
    SequelizeModule.forFeature([Delivery, User, Product, DeliveryProducts]),
    ProductModule,
    AbilityModule,
    forwardRef(() => AuthModule)
  ],
  exports: [DeliveryService],
})
export class DeliveryModule {}
