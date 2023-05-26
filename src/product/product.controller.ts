import { JwtAuthGuard, Roles, ROLES, RolesGuard } from '@app/common';
import {
  Product,
  RegisterProductDto,
  UpdateProductDto,
  User,
} from '@app/database';
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
import { ProductService } from './product.service';

@ApiTags('Товары')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiOperation({
    summary: 'Создание нового товара',
    description: 'Требуется роль SELLER или ADMIN',
  })
  @ApiBody({
    type: RegisterProductDto,
    description: 'DTO для создания товара',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Product })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании товара',
  })
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.SELLER)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() dto: RegisterProductDto): Promise<Product> {
    return this.productService.registerNew(dto);
  }
  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }
  @ApiOperation({ summary: 'Получить один товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар не найден',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Product> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'DTO для обновления товара',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар не найден',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
    @Req() req: any,
  ): Promise<Product> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.productService.update(id, dto, user);
  }
  @ApiOperation({ summary: 'Удалить товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID товара',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар не найден',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req: any): Promise<Product> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.productService.delete(id, user);
  }
}
