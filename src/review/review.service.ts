import { ACTIONS, ReviewsOutput } from '@app/common';
import {
  CreateRewviewDto,
  PagReviewsDto,
  Product,
  Review,
  UpdateReviewDto,
  User,
} from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AbilityService } from 'src/ability/ability.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private reviewRepository: typeof Review,
    private userService: UserService,
    private productService: ProductService,
    private abilityService: AbilityService,
  ) {}
  /**
   * Создать отзыв на товар
   * @param {CreateRewviewDto} dto - DTO для создания отзыва на товар
   * @returns {Review} - созданный отзыв на товар
   * @throws BadRequestException - ошибка создания отзыва на товар
   */
  async create(dto: CreateRewviewDto): Promise<Review> {
    const user: User = await this.userService.getOne(dto.user);
    const product: Product = await this.productService.getOne(dto.product);
    console.log('Creating review...');
    const review: Review = await this.reviewRepository.create(dto);
    if (!review) {
      console.error('Ошибка создания отзыва на товар');
      throw new BadRequestException('Ошибка создания отзыва на товар');
    }
    review.$set('user', user.id);
    review.user = user;
    review.$set('product', product.id);
    review.product = product;
    await user.save();
    await product.save();
    await review.save();
    console.log('Review was created');
    return review;
  }
  /**
   * Получить все отзывы на товары
   * @returns {Review[]} - массив отзывов на товары
   */
  async getAll(dto: PagReviewsDto): Promise<ReviewsOutput> {
    const page: number = dto.page ? dto.page : 1;
    const take: number = dto.take ? dto.take : 10;
    const skip = (page - 1) * take;
    const user: number | null = dto.user ? dto.user : null;
    const product: number | null = dto.product ? dto.product : null;
    let userWhere = user ? { id: user } : {};
    let productWhere = product ? { id: product } : {};
    let include: any[] = [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'email'],
        where: userWhere,
      },
      {
        model: Product,
        as: 'product',
        where: productWhere,
      },
    ];
    console.log('Found all review...');
    const reviews: Review[] = await this.reviewRepository.findAll({
      include,
      offset: skip,
      limit: take,
    });
    const reviews_count = await this.reviewRepository.count({
      include,
    });
    const output: ReviewsOutput = {
      reviews,
      count: reviews_count,
    };
    console.log('Found result');
    return output;
  }
  /**
   * Получить один отзыв на товар
   * @param {number} id - ID отзыва
   * @returns {Review} - найденный отзыв
   * @throws NotFountException - отзыв на товар не найден
   */
  async getOne(id: number): Promise<Review> {
    console.log('Finding review...');
    const review: Review = await this.reviewRepository.findOne({
      where: { id },
      include: { all: true },
    });
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
  async update(
    id: number,
    dto: UpdateReviewDto,
    req_user: User,
  ): Promise<Review> {
    const review: Review = await this.getOne(id);
    this.abilityService.checkAbility(req_user, review, ACTIONS.UPDATE);
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
  async delete(id: number, req_user: User): Promise<Review> {
    const review: Review = await this.getOne(id);
    this.abilityService.checkAbility(req_user, review, ACTIONS.DELETE);
    console.log('Removing review...');
    await review.destroy();
    console.log('Review was destroy');
    return review;
  }
}
