import { Product, Review, User } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [SequelizeModule.forFeature([Review, Product, User])],
  exports: [ReviewService],
})
export class ReviewModule {}
