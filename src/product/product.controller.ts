import { CreateProductDto, Product, UpdateProductDto } from '@app/database';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Товары')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiOperation({ summary: 'Создание нового товара' })
  @ApiBody({
    type: CreateProductDto,
    description: 'DTO для создания товара',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Product })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании товара',
  })
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }
  @ApiOperation({ summary: 'Получить один товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар не найден',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Product> {
    return this.productService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'DTO для обновления товара',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар не найден',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар не найден',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Product> {
    return this.productService.delete(id);
  }
}
