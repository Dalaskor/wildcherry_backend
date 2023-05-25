import { Profile, UpdateProfileDto } from '@app/database';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiTags('Профили')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @ApiOperation({ summary: 'Получить профиль по id пользователя' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Profile })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Профиль не найден',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Profile> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.profileService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить профиль по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiBody({
    type: UpdateProfileDto,
    description: 'DTO для обновления профиля',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Profile })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Профиль не найден',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProfileDto,
  ): Promise<Profile> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.profileService.update(id, dto);
  }
}
