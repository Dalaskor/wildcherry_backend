import { Category, CreateCategoryDto, UpdateCategoryDto } from '@app/database';
import {
  BadRequestException,
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
import { CategoryService } from './category.service';

@ApiTags('Категории товаров')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOperation({ summary: 'Создание новой категории товаров' })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'DTO для создания категории товаров',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Category })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании категории товаров',
  })
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все категории товаров' })
  @ApiResponse({ status: HttpStatus.OK, type: Category, isArray: true })
  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }
  @ApiOperation({ summary: 'Получить одну категорию товаров по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID категории товаров',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Category })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Категория не найдена',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Category> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.categoryService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить категорию товаров по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID категории товаров',
    example: 1,
  })
  @ApiBody({
    type: UpdateCategoryDto,
    description: 'DTO для обновления категории товаров',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Category })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Категория не найдена',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.categoryService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить категорию товаров по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID категории товаров',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Category })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Категория товаров не найдена',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Category> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.categoryService.delete(id);
  }
}
