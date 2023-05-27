import { ACTIONS, DiscountsOutput } from '@app/common';
import {
  CreateDiscountDto,
  Discount,
  PagDiscountDto,
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
    const productsIds: number[] = [];
    for (const item of products) {
      productsIds.push(item.id);
    }
    await discount.$set('products', productsIds);
    discount.products = products;
    await discount.$set('owner', user);
    discount.owner = user;
    await discount.save();
    console.log('Discount was created');
    return discount;
  }
  /**
   * Получить все акции
   * @returns {Discount[]} - массив акций
   */
  async getAll(dto: PagDiscountDto): Promise<DiscountsOutput> {
    const page: number = dto.page ? dto.page : 1;
    const take: number = dto.take ? dto.take : 10;
    const skip = (page - 1) * take;
    const user: number | null = dto.user ? dto.user : null;
    const product: number | null = dto.product ? dto.product : null;
    let include: any[] = [];
    if (product) {
      include.push({
        model: Product,
        as: 'products',
        where: {
          id: product,
        },
      });
    }
    if (user) {
      include.push({
        model: User,
        as: 'owner',
        where: {
          id: user,
        },
      });
    }
    console.log('Found all discounts...');
    const discounts: Discount[] = await this.discountRepository.findAll({
      include,
      offset: skip,
      limit: take,
    });
    console.log('Found result');
    const discount_count = await this.discountRepository.count({
      include,
    });
    const output: DiscountsOutput = {
      discounts,
      count: discount_count,
    };
    return output;
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
    const productsIds: number[] = [];
    for (const item of products) {
      productsIds.push(item.id);
    }
    await discount.$set('products', productsIds);
    discount.products = products;
    await discount.save();
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
