import { Category, SubCategory } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([Category, SubCategory])],
  exports: [CategoryService],
})
export class CategoryModule {}
