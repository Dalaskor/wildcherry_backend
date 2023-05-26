import { JwtAuthGuard } from '@app/common';
import { Profile, UpdateProfileDto, User } from '@app/database';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  UnauthorizedException,
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProfileDto,
    @Req() req: any,
  ): Promise<Profile> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    if (!req.user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    return this.profileService.update(id, dto, user);
  }
}
