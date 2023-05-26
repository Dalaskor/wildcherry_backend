import { ROLES, Roles, RolesGuard } from '@app/common';
import {
  CreateSubCategoryDto,
  SubCategory,
  UpdateSubCategoryDto,
} from '@app/database';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubCategoryService } from './sub-category.service';

@ApiTags('Подкатегории товаров')
@Controller('subcategory')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}
  @ApiOperation({
    summary: 'Создание новой подкатегории товаров',
    description: 'Треубется роль ADMIN',
  })
  @ApiBody({
    type: CreateSubCategoryDto,
    description: 'DTO для создания подкатегории товаров',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: SubCategory })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании подкатегории товаров',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() dto: CreateSubCategoryDto): Promise<SubCategory> {
    return this.subCategoryService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все подкатегории товаров' })
  @ApiResponse({ status: HttpStatus.OK, type: SubCategory, isArray: true })
  @Get()
  async getAll(): Promise<SubCategory[]> {
    return this.subCategoryService.getAll();
  }
  @ApiOperation({ summary: 'Получить одну подкатегорию товаров по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID подкатегории товаров',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubCategory })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Подкатегория товаров не найдена',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<SubCategory> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.subCategoryService.getOne(id);
  }
  @ApiOperation({
    summary: 'Обновить подкатегория товаров по id',
    description: 'Требуется роль ADMIN',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID подкатегории товаров',
    example: 1,
  })
  @ApiBody({
    type: UpdateSubCategoryDto,
    description: 'DTO для обновления подкатегории товаров',
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubCategory })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Подкатегория товаров не найдена',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.subCategoryService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить подкатегорию товаров по id', description: 'Требуется роль ADMIN' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID подкатегории товаров',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubCategory })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Подкатегория товаров не найдена',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<SubCategory> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.subCategoryService.delete(id);
  }
}
