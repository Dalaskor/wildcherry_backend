import { CreateProfileDto, Profile, UpdateProfileDto } from '@app/database';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiTags('Профили')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @ApiOperation({ summary: 'Создание нового профиля' })
  @ApiBody({
    type: CreateProfileDto,
    description: 'DTO для создания профиля',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Profile })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании профиля',
  })
  @Post()
  async create(@Body() dto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все профили' })
  @ApiResponse({ status: HttpStatus.OK, type: Profile, isArray: true })
  @Get()
  async getAll(): Promise<Profile[]> {
    return this.profileService.getAll();
  }
  @ApiOperation({ summary: 'Получить один профиль по id' })
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
  @ApiOperation({ summary: 'Удалить профиль по id' })
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
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Profile> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.profileService.delete(id);
  }
}
