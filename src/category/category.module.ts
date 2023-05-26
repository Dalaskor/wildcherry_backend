import { Category, SubCategory } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    SequelizeModule.forFeature([Category, SubCategory]),
    forwardRef(() => AuthModule),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
