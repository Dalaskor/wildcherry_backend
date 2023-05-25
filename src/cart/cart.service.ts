import { Cart } from '@app/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

export class CartService {
  constructor(@InjectModel(Cart) private cartRepository: typeof Cart) {}
  /**
   * Создать раздел с корзиной пользователя
   * @returns {Cart} - созданный раздел
   * @throws BadRequestException - ошибка создания раздела
   */
  async create(): Promise<Cart> {
    console.log('Creating cart...');
    const cart: Cart = await this.cartRepository.create();
    if (!cart) {
      console.error('Ошибка создания корзины');
      throw new BadRequestException('Ошибка создания корзины');
    }
    console.log('Cart was created');
    return cart;
  }
  /**
   * Получить коризну пользователя
   * @param {number} id - ID пользователя
   * @returns {Cart} - пользователь
   * @throws NotFountException - корзина не найдена
   */
  async getOne(id: number): Promise<Cart> {
    console.log('Finding cart...');
    const cart: Cart = await this.cartRepository.findOne({
      where: { fk_cartid: id },
      include: { all: true },
    });
    if (!cart) {
      console.error('Корзина не найдена');
      throw new NotFoundException('Корзина не найдена');
    }
    console.log('Cart was founded');
    return cart;
  }
  /**
   * Удалить коризну пользователя
   * @param {number} id - ID пользователя
   * @returns {Cart} - удаленная корзина пользователя
   */
  async delete(id: number): Promise<Cart> {
    const cart: Cart = await this.getOne(id);
    console.log('Removing cart...');
    await cart.destroy();
    console.log('Cart was destroy');
    return cart;
  }
}
