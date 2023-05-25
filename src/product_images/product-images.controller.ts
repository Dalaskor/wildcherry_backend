import { CreateProductImagesDto, UpdateProductImagesDto } from '@app/database';
import { ProductImages } from '@app/database/models/product-images.model';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductImagesService } from './product-images.service';

@ApiTags('Изображения товаров')
@Controller('product-img')
export class ProductImagesController {
  constructor(private productImgService: ProductImagesService) {}
  @ApiOperation({ summary: 'Создание нового изображения товара' })
  @ApiBody({
    type: CreateProductImagesDto,
    description: 'DTO для создания изобраежния товара',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: ProductImages })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании изображения товара',
  })
  @Post()
  async create(@Body() dto: CreateProductImagesDto): Promise<ProductImages> {
    return this.productImgService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все изображения товаров' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductImages, isArray: true })
  @Get()
  async getAll(): Promise<ProductImages[]> {
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
  @ApiOperation({ summary: 'Обновить изображение товара по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID изображения товара',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductImagesDto,
    description: 'DTO для обновления изображения товара',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ProductImages })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Изображение товара не найдено',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductImagesDto,
  ): Promise<ProductImages> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productImgService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить изображение товара по id' })
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
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ProductImages> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productImgService.delete(id);
  }
}
