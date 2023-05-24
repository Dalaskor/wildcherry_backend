import { CreateRoleDto, Role, UpdateRoleDto } from '@app/database';
import {
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
import { RoleSerivce } from './role.service';

@ApiTags('Роли')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleSerivce) {}
  @ApiOperation({ summary: 'Создание новой роли' })
  @ApiBody({
    type: CreateRoleDto,
    description: 'DTO для создания роли',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: HttpStatus.OK, type: Role, isArray: true })
  @Get()
  async getAll(): Promise<Role[]> {
    return this.roleService.getAll();
  }
  @ApiOperation({ summary: 'Получить одну роль по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID роли',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить роль по id' })
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
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить роль по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID роли',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Role> {
    return this.roleService.delete(id);
  }
}
