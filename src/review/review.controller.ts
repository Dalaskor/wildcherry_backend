import { JwtAuthGuard } from '@app/common';
import {
  CreateRewviewDto,
  PagReviewsDto,
  Review,
  UpdateReviewDto,
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
  Query,
  Req,
  Res,
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateRewviewDto): Promise<Review> {
    return this.reviewService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все отзывы на товары' })
  @ApiResponse({ status: HttpStatus.OK, type: Review, isArray: true })
  @Get()
  async getAll(@Query() dto: PagReviewsDto, @Res() res: any): Promise<any> {
    const output = await this.reviewService.getAll(dto);
    await res.header('x-total-count', output.count);
    await res.send(output.reviews);
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
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateReviewDto,
    @Req() req: any,
  ): Promise<Review> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.reviewService.update(id, dto, user);
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req: any): Promise<Review> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const user: User = req.user;
    return this.reviewService.delete(id, user);
  }
}
