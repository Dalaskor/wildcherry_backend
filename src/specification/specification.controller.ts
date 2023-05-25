import { CreateSpecificationDto, Specification, UpdateSpecificationDto } from '@app/database';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecificationService } from './specification.service';

@ApiTags('Характеристики товаров')
@Controller('specification')
export class SpecificationController {
  constructor(private specificationService: SpecificationService) {}
  @ApiOperation({ summary: 'Создание новой характеристики' })
  @ApiBody({
    type: CreateSpecificationDto,
    description: 'DTO для создания характеристики',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Specification})
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании характеристики',
  })
  @Post()
  async create(@Body() dto: CreateSpecificationDto): Promise<Specification> {
    return this.specificationService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все характеристики' })
  @ApiResponse({ status: HttpStatus.OK, type: Specification, isArray: true })
  @Get()
  async getAll(): Promise<Specification[]> {
    return this.specificationService.getAll();
  }
  @ApiOperation({ summary: 'Получить одну характеристику по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID характеристики',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Specification })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Характеристика не найдена',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Specification> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.specificationService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить характеристику по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID характеристики',
    example: 1,
  })
  @ApiBody({
    type: UpdateSpecificationDto,
    description: 'DTO для обновления характеристики',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Specification })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Характеристика не найдена',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSpecificationDto,
  ): Promise<Specification> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.specificationService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить характеристику по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID характеристики',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Specification })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Характеристика не найдена',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Specification> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.specificationService.delete(id);
  }
}
