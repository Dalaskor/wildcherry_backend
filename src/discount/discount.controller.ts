import { ROLES, Roles, RolesGuard } from '@app/common';
import {
  CreateDiscountDto,
  Discount,
  UpdateDiscountDto,
  User,
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
  Req,
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
import { DiscountService } from './discount.service';

@ApiTags('Акции на товары')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}
  @ApiOperation({
    summary: 'Создание новой акции на товары',
    description: 'Требуется роль SELLER или ADMIN',
  })
  @ApiBody({
    type: CreateDiscountDto,
    description: 'DTO для создания акции',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Discount })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании акции',
  })
  @ApiBearerAuth()
  @Roles(ROLES.SELLER, ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() dto: CreateDiscountDto): Promise<Discount> {
    return this.discountService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все акции на товары' })
  @ApiResponse({ status: HttpStatus.OK, type: Discount, isArray: true })
  @Get()
  async getAll(): Promise<Discount[]> {
    return this.discountService.getAll();
  }
  @ApiOperation({ summary: 'Получить одну акцию по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID акции',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Discount })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Акция не найдена',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Discount> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.discountService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить акцию по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID акции',
    example: 1,
  })
  @ApiBody({
    type: UpdateDiscountDto,
    description: 'DTO для обновления акции',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Discount })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'акция не найдена',
  })
  @ApiBearerAuth()
  @Roles(ROLES.SELLER, ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDiscountDto,
    @Req() req: any,
  ): Promise<Discount> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.discountService.update(id, dto, user);
  }
  @ApiOperation({ summary: 'Удалить акцию по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID акции',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Discount })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Акция не найдена',
  })
  @ApiBearerAuth()
  @Roles(ROLES.SELLER, ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req: any): Promise<Discount> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.discountService.delete(id, user);
  }
}
