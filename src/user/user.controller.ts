import { JwtAuthGuard, ROLES, Roles, RolesGuard } from '@app/common';
import {
    PagUsersDto,
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
  Query,
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
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({
    summary: 'Получить всех пользователей',
    description: 'Требуется роль ADMIN',
  })
  @ApiResponse({ status: HttpStatus.OK, type: User, isArray: true })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAll(@Query() dto: PagUsersDto): Promise<User[]> {
    return this.userService.getAll(dto);
  }
  @ApiOperation({
    summary: 'Добавить роль пользователю',
    description: 'Требуется роль ADMIN',
  })
  @ApiBody({
    type: UserAddRoleDto,
    description: 'DTO для добавления роли',
  })
  @ApiResponse({
    type: User,
    description: 'Пользователь',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Put('role')
  async addRole(@Body() dto: UserAddRoleDto): Promise<User> {
    return await this.userService.addRole(dto);
  }
  @ApiOperation({
    summary: 'Удалить роль пользователю',
    description: 'Требуется роль ADMIN',
  })
  @ApiBody({
    type: UserRemoveRoleDto,
    description: 'DTO для удаления роли',
  })
  @ApiResponse({
    type: User,
    description: 'Пользователь',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Req() req: any): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.userService.getOneWithCasl(id, user);
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
    @Req() req: any,
  ): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.userService.update(id, dto, user);
  }
  @ApiOperation({
    summary: 'Удалить пользователя по id',
    description: 'Требуется роль ADMIN',
  })
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
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.userService.delete(id);
  }
}
