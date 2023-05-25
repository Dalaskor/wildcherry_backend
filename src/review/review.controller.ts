import { CreateRewviewDto, Review, UpdateReviewDto } from '@app/database';
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
import { ReviewService } from './review.service';

@ApiTags('Отзывы на товары')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @ApiOperation({ summary: 'Создание нового отзыва на товар' })
  @ApiBody({
    type: CreateRewviewDto,
    description: 'DTO для создания отзыва на товар',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Review })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании отзыва на товар',
  })
  @Post()
  async create(@Body() dto: CreateRewviewDto): Promise<Review> {
    return this.reviewService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все отзывы на товары' })
  @ApiResponse({ status: HttpStatus.OK, type: Review, isArray: true })
  @Get()
  async getAll(): Promise<Review[]> {
    return this.reviewService.getAll();
  }
  @ApiOperation({ summary: 'Получить один отзыв по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID отзыва',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Review })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Отзыв на товар не найден',
  })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Review> {
    return this.reviewService.getOne(id);
  }
  @ApiOperation({ summary: 'Обновить данные отзыва на товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID отзыва на товар',
    example: 1,
  })
  @ApiBody({
    type: UpdateReviewDto,
    description: 'DTO для обновления отзыва на товар',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Review })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'отзыв на товар не найден',
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, dto);
  }
  @ApiOperation({ summary: 'Удалить отзыв на товар по id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID отзыва на товар',
    example: 1,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Review })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Отзыв на товар не найден',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Review> {
    return this.reviewService.delete(id);
  }
}
