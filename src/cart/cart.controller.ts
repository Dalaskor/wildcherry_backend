import { Cart } from "@app/database";
import { BadRequestException, Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";

@ApiTags('Корзина пользователя')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
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
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Cart> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.cartService.getOne(id);
  }
}
