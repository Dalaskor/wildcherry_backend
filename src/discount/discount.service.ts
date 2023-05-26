import { ACTIONS } from '@app/common';
import {
  CreateDiscountDto,
  Discount,
  Product,
  UpdateDiscountDto,
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
export class DiscountService {
  constructor(
    @InjectModel(Discount) private discountRepository: typeof Discount,
    private userService: UserService,
    private productService: ProductService,
    private abilityService: AbilityService,
  ) {}
  /**
   * Создать акцию
   * @param {CreateDiscountDto} dto - DTO для создания акции
   * @returns {Discount} - созданная акция
   * @throws BadRequestException - ошибка создания акции
   */
  async create(dto: CreateDiscountDto): Promise<Discount> {
    const user: User = await this.userService.getOne(dto.user);
    const products: Product[] = [];
    if (!Array.isArray(dto.products)) {
      dto.products = [dto.products];
    }
    for await (const item of dto.products) {
      const product: Product = await this.productService.getOne(item);
      products.push(product);
    }
    console.log('Creating discount...');
    const discount: Discount = await this.discountRepository.create(dto);
    if (!discount) {
      console.error('Ошибка создания акции');
      throw new BadRequestException('Ошибка создания акции');
    }
    discount.products = products;
    discount.owner = user;
    await discount.save();
    if (!user.discounts) {
      await user.$set('discounts', []);
      user.discounts = [];
    }
    await user.$add('discounts', discount.id);
    user.discounts.push(discount);
    await user.save();
    for await (const product of products) {
      if (!product.discounts) {
        await product.$set('discounts', []);
        product.discounts = [];
      }
      await product.$add('discounts', discount.id);
      product.discounts.push(discount);
      await product.save();
    }
    console.log('Discount was created');
    return discount;
  }
  /**
   * Получить все акции
   * @returns {Discount[]} - массив акций
   */
  async getAll(): Promise<Discount[]> {
    console.log('Found all discounts...');
    const discounts: Discount[] = await this.discountRepository.findAll();
    console.log('Found result');
    return discounts;
  }
  /**
   * Получить одну акцию
   * @param {number} id - ID акции
   * @returns {Discount} - найденная акция
   * @throws NotFountException - акция не найдена
   */
  async getOne(id: number): Promise<Discount> {
    console.log('Finding discount...');
    const discount: Discount = await this.discountRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!discount) {
      console.error('Акция не найдена');
      throw new NotFoundException('Акция не найдена');
    }
    console.log('Discount was founded');
    return discount;
  }
  /**
   * Обновить данные акции
   * @param {number} id - ID акции
   * @param {UpdateDiscountDto} dto - DTO для обновления данных акции
   * @returns {Discount} - обновленная акция
   */
  async update(
    id: number,
    dto: UpdateDiscountDto,
    req_user: User,
  ): Promise<Discount> {
    const products: Product[] = [];
    if (!Array.isArray(dto.products)) {
      dto.products = [dto.products];
    }
    for await (const item of dto.products) {
      const product: Product = await this.productService.getOne(item);
      products.push(product);
    }
    const discount: Discount = await this.getOne(id);
    this.abilityService.checkAbility(req_user, discount, ACTIONS.UPDATE);
    console.log('Discount changing...');
    discount.title = dto.title ? dto.title : discount.title;
    discount.description = dto.description
      ? dto.description
      : discount.description;
    discount.value = dto.value ? dto.value : discount.value;
    discount.products = products;
    await discount.save();
    for await (const product of products) {
      if (!product.discounts) {
        await product.$set('discounts', []);
        product.discounts = [];
      }
      await product.$add('discounts', discount.id);
      product.discounts.push(discount);
      await product.save();
    }
    console.log('Discount was changed');
    const updatedDiscount: Discount = await this.discountRepository.findByPk(
      discount.id,
    );
    if (!updatedDiscount) {
      console.error('Обновленная акция не найдена');
      throw new NotFoundException('Обновленная акция не найдена');
    }
    return updatedDiscount;
  }
  /**
   * Удалить акцию
   * @param {number} id - ID акции
   * @returns {Discount} - Удаленная акция
   */
  async delete(id: number, req_user: User): Promise<Discount> {
    const discount: Discount = await this.getOne(id);
    this.abilityService.checkAbility(req_user, discount, ACTIONS.DELETE);
    console.log('Removing discount...');
    await discount.destroy();
    console.log('Discount was destroy');
    return discount;
  }
}
