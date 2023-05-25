import { CreateUserDto, UpdateUserDto, User } from '@app/database';
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
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiBody({
    type: CreateUserDto,
    description: 'DTO для создания пользователя',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании пользователя',
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: User, isArray: true })
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  @ApiOperation({ summary: 'Получить одного пользователя по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.userService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить пользователя по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'DTO для обновления пользователя',
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.userService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить пользователя по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.userService.delete(id);
  }
}
