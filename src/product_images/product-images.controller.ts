import { ProductImages } from '@app/database/models/product-images.model';
import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductImagesService } from './product-images.service';

@ApiTags('Изображения товаров')
@Controller('product-img')
export class ProductImagesController {
  constructor(private productImgService: ProductImagesService) {}
  @ApiOperation({ summary: 'Получить все изображения товаров' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductImages, isArray: true })
  @Get()
  async getAll(): Promise<ProductImages[]> {
    return this.productImgService.getAll();
  }
  @ApiOperation({ summary: 'Получить все изображения товара' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductImages, isArray: true })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @Get('product/:id')
  async getAllByProduct(@Param('id') id: number): Promise<ProductImages[]> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productImgService.getAll();
  }
  @ApiOperation({ summary: 'Получить одно изображение товара по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID изображения товара',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: ProductImages })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Изображение товара не найдено',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<ProductImages> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productImgService.getOne(id);
  }
}
