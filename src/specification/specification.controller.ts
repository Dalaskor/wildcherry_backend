import { Specification } from '@app/database';
import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecificationService } from './specification.service';

@ApiTags('Характеристики товаров')
@Controller('specification')
export class SpecificationController {
  constructor(private specificationService: SpecificationService) {}
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
}
