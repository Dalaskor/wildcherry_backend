import { JwtAuthGuard } from '@app/common';
import { Delivery, ManageDeliveryDto, User } from '@app/database';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';

@ApiTags('Раздел доставки пользователя')
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}
  @ApiOperation({ summary: 'Добавить товар в доставку' })
  @ApiBody({
    type: ManageDeliveryDto,
    description: 'DTO для управления доставкой',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Delivery,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/product')
  async addProduct(@Body() dto: ManageDeliveryDto, @Req() req: any): Promise<Delivery> {
    const user: User = req.user;
    return this.deliveryService.addProduct(dto, user);
  }
  @ApiOperation({ summary: 'Удалить товар из доставки' })
  @ApiBody({
    type: ManageDeliveryDto,
    description: 'DTO для управления доставкой',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Delivery,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/product')
  async removeProduct(
    @Body() dto: ManageDeliveryDto,
    @Req() req: any,
  ): Promise<Delivery> {
    const user: User = req.user;
    return this.deliveryService.removeProduct(dto, user);
  }
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Req() req: any): Promise<Delivery> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.deliveryService.getOneCasl(id, user);
  }
  @ApiOperation({ summary: 'Очистить доставку' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Delivery,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async clear(@Param('id') id: number, @Req() req: any): Promise<Delivery> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.deliveryService.clear(id, user);
  }
}
