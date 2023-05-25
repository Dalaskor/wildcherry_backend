import {
  UpdateUserDto,
  User,
  UserAddRoleDto,
  UserRemoveRoleDto,
} from '@app/database';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: User, isArray: true })
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  @ApiOperation({ summary: 'Добавить роль пользователю' })
  @ApiBody({
    type: UserAddRoleDto,
    description: 'DTO для добавления роли',
  })
  @ApiResponse({
    type: User,
    description: 'Пользователь',
  })
  @Put('role')
  async addRole(@Body() dto: UserAddRoleDto): Promise<User> {
    return await this.userService.addRole(dto);
  }
  @ApiOperation({ summary: 'Удалить роль пользователю' })
  @ApiBody({
    type: UserRemoveRoleDto,
    description: 'DTO для удаления роли',
  })
  @ApiResponse({
    type: User,
    description: 'Пользователь',
  })
  @Delete('role')
  async removeRole(@Body() dto: UserRemoveRoleDto): Promise<User> {
    return await this.userService.removeRole(dto);
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
