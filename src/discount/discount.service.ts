import { CreateDiscountDto, Discount, UpdateDiscountDto } from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private discountRepository: typeof Discount,
  ) {}
  /**
   * Создать акцию
   * @param {CreateDiscountDto} dto - DTO для создания акции
   * @returns {Discount} - созданная акция
   * @throws BadRequestException - ошибка создания акции
   */
  async create(dto: CreateDiscountDto): Promise<Discount> {
    console.log('Creating discount...');
    const discount: Discount = await this.discountRepository.create(dto);
    if (!discount) {
      console.error('Ошибка создания акции');
      throw new BadRequestException('Ошибка создания акции');
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
    const discount: Discount = await this.discountRepository.findByPk(id);
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
  async update(id: number, dto: UpdateDiscountDto): Promise<Discount> {
    const discount: Discount = await this.getOne(id);
    console.log('Discount changing...');
    discount.title = dto.title ? dto.title : discount.title;
    discount.description = dto.description
      ? dto.description
      : discount.description;
    discount.value = dto.value ? dto.value : discount.value;
    await discount.save();
    console.log('Discount was changed');
    const updatedDiscount: Discount = await this.discountRepository.findByPk(discount.id);
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
  async delete(id: number): Promise<Discount> {
    const discount: Discount = await this.getOne(id);
    console.log('Removing discount...');
    await discount.destroy();
    console.log('Discount was destroy');
    return discount;
  }
}
