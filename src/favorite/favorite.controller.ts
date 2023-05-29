import { JwtAuthGuard } from '@app/common';
import { Favorite, User } from '@app/database';
import {
  BadRequestException,
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
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';

@ApiTags('Раздел избранного')
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @ApiOperation({ summary: 'Получить раздел избранного по id пользователя' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Favorite })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Раздел не найден',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Req() req: any): Promise<Favorite> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.favoriteService.getOneCasl(id, user);
  }
  @ApiOperation({ summary: 'Очистить раздел избранного' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Favorite })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Раздел не найден',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async clear(@Param('id') id: number, @Req() req: any): Promise<Favorite> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.favoriteService.clear(id, user);
  }
  @ApiOperation({ summary: 'Добавить товар в избранное' })
  @ApiParam({
    name: 'user_id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiParam({
    name: 'product_id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:user_id/:product_id')
  async addProduct(
    @Param('user_id') userId: number,
    @Param('product_id') productId: number,
    @Req() req: any,
  ): Promise<Favorite> {
    if (!Number(userId) || !Number(productId)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return await this.favoriteService.addProduct(userId, productId, user);
  }
  @ApiOperation({ summary: 'Удалить товар из избранного' })
  @ApiParam({
    name: 'user_id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiParam({
    name: 'product_id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:user_id/:product_id')
  async removeProduct(
    @Param('user_id') userId: number,
    @Param('product_id') productId: number,
    @Req() req: any,
  ): Promise<Favorite> {
    if (!Number(userId) || !Number(productId)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return await this.favoriteService.removeProduct(userId, productId, user);
  }
}
