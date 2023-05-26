import { Product, Review, User } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [
    SequelizeModule.forFeature([Review, Product, User]),
    UserModule,
    ProductModule,
    AbilityModule,
    forwardRef(() => AuthModule),
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
