import { Category, Product, SubCategory } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  providers: [SubCategoryService],
  controllers: [SubCategoryController],
  imports: [SequelizeModule.forFeature([SubCategory, Category, Product])],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
