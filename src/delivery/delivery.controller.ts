import { Delivery } from '@app/database';
import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';

@ApiTags('Раздел доставки пользователя')
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}
  @ApiOperation({ summary: 'Получить раздел доставки по id пользователя' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Delivery })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Доставка не найдена',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Delivery> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.deliveryService.getOne(id);
  }
}
