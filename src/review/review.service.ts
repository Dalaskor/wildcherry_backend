import { CreateRewviewDto, Review, UpdateReviewDto } from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review) private reviewRepository: typeof Review) {}
  /**
   * Создать отзыв на товар
   * @param {CreateRewviewDto} dto - DTO для создания отзыва на товар
   * @returns {Review} - созданный отзыв на товар
   * @throws BadRequestException - ошибка создания отзыва на товар
   */
  async create(dto: CreateRewviewDto): Promise<Review> {
    console.log('Creating review...');
    const review: Review = await this.reviewRepository.create(dto);
    if (!review) {
      console.error('Ошибка создания отзыва на товар');
      throw new BadRequestException('Ошибка создания отзыва на товар');
    }
    console.log('Review was created');
    return review;
  }
  /**
   * Получить все отзывы на товары
   * @returns {Review[]} - массив отзывов на товары
   */
  async getAll(): Promise<Review[]> {
    console.log('Found all review...');
    const reviews: Review[] = await this.reviewRepository.findAll();
    console.log('Found result');
    return reviews;
  }
  /**
   * Получить один отзыв на товар
   * @param {number} id - ID отзыва
   * @returns {Review} - найденный отзыв
   * @throws NotFountException - отзыв на товар не найден
   */
  async getOne(id: number): Promise<Review> {
    console.log('Finding review...');
    const review: Review = await this.reviewRepository.findByPk(id);
    if (!review) {
      console.error('Отзыв на товар не найден');
      throw new NotFoundException('Отзыв на товар не найден');
    }
    console.log('Review was founded');
    return review;
  }
  /**
   * Обновить данные отзыва на товар
   * @param {number} id - ID отзва на товар
   * @param {UpdateReviewDto} dto - DTO для обновления данных отзыва
   * @returns {Review} - Обновленный отзыв
   */
  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review: Review = await this.getOne(id);
    console.log('Review changing...');
    review.title = dto.title ? dto.title : review.title;
    review.description = dto.description ? dto.description : review.description;
    review.score = dto.score ? dto.score : review.score;
    await review.save();
    console.log('Review was changed');
    const updatedReview: Review = await this.reviewRepository.findByPk(
      review.id,
    );
    if (!updatedReview) {
      console.error('Обновленный отзыв на товар не найден');
      throw new NotFoundException('Обновленный отзыв на товар не найден');
    }
    return updatedReview;
  }
  /**
   * Удалить отзыв на товар
   * @param {number} id - ID отзыва на товар
   * @returns {Review} - Удаленный отзыв на товар
   */
  async delete(id: number): Promise<Review> {
    const review: Review = await this.getOne(id);
    console.log('Removing review...');
    await review.destroy();
    console.log('Review was destroy');
    return review;
  }
}
