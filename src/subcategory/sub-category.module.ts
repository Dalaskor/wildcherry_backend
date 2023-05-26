import { Category, Product, SubCategory } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  providers: [SubCategoryService],
  controllers: [SubCategoryController],
  imports: [
    SequelizeModule.forFeature([SubCategory, Category, Product]),
    forwardRef(() => AuthModule),
  ],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
