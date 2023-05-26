import { ROLES, Roles, RolesGuard } from '@app/common';
import { CreateRoleDto, Role, UpdateRoleDto } from '@app/database';
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
import { RoleSerivce } from './role.service';

@ApiTags('Роли')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleSerivce) {}
  @ApiOperation({
    summary: 'Создание новой роли',
    description: 'Требуется роль ADMIN',
  })
  @ApiBody({
    type: CreateRoleDto,
    description: 'DTO для создания роли',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании роли',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: HttpStatus.OK, type: Role, isArray: true })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Role[]> {
    return this.roleService.getAll();
  }
  @ApiOperation({
    summary: 'Получить одну роль по id',
    description: 'Требуются роль ADMIN',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID роли',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Роль не найдена' })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Role> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.roleService.getOne(id);
  }
  @ApiOperation({
    summary: 'Обновить роль по id',
    description: 'Требуется роль ADMIN',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID роли',
    example: 1,
  })
  @ApiBody({
    type: UpdateRoleDto,
    description: 'DTO для обновления роли',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Роль не найдена' })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.roleService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить роль по id', description: 'Требуется роль ADMIN' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID роли',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Роль не найдена' })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Role> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.roleService.delete(id);
  }
}
