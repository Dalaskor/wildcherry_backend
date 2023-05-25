import { Favorite } from '@app/database';
import { BadRequestException, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Favorite> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.favoriteService.getOne(id);
  }
}
