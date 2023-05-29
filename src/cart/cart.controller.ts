import { JwtAuthGuard } from '@app/common';
import { Cart, ManageCartDto, User } from '@app/database';
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service';

@ApiTags('Корзина пользователя')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @ApiOperation({ summary: 'Добавить товар в корзину' })
  @ApiBody({
    type: ManageCartDto,
    description: 'DTO для управления корзиной',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Cart,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/product')
  async addProduct(@Body() dto: ManageCartDto, @Req() req: any): Promise<Cart> {
    const user: User = req.user;
    return this.cartService.addProduct(dto, user);
  }
  @ApiOperation({ summary: 'Удалить товар из корзины' })
  @ApiBody({
    type: ManageCartDto,
    description: 'DTO для управления корзиной',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Cart,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/product')
  async removeProduct(
    @Body() dto: ManageCartDto,
    @Req() req: any,
  ): Promise<Cart> {
    const user: User = req.user;
    return this.cartService.removeProduct(dto, user);
  }
  @ApiOperation({ summary: 'Получить корзину по id пользователя' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Cart })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Корзина не найдена',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Req() req: any): Promise<Cart> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.cartService.getOneCasl(id, user);
  }
  @ApiOperation({ summary: 'Очистить корзину' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Cart,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async clear(@Param('id') id: number, @Req() req: any): Promise<Cart> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.cartService.clear(id, user);
  }
}
