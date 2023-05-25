import { Product } from '@app/database';
import { ProductImages } from '@app/database/models/product-images.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';

@Module({
  providers: [ProductImagesService],
  controllers: [ProductImagesController],
  imports: [SequelizeModule.forFeature([ProductImages, Product])],
  exports: [ProductImagesService],
})
export class ProductImagesModule {}
