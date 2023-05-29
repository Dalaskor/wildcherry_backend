import { ACTIONS } from '@app/common';
import {
  Cart,
  CartProducts,
  ManageCartDto,
  Product,
  User,
} from '@app/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AbilityService } from 'src/ability/ability.service';
import { ProductService } from 'src/product/product.service';

export class CartService {
  constructor(
    @InjectModel(Cart) private cartRepository: typeof Cart,
    @InjectModel(CartProducts)
    private cartProductsRepository: typeof CartProducts,
    private productService: ProductService,
    private abilityService: AbilityService,
  ) {}
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
  async getOneCasl(id: number, req_user: User): Promise<Cart> {
    const cart: Cart = await this.getOne(id);
    this.abilityService.checkAbility(req_user, cart, ACTIONS.READ);
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
  /**
   * Очистить корзину
   * @param {number} userId - ID пользователя
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async clear(userId: number, req_user: User) {
    const cart: Cart = await this.getOne(userId);
    this.abilityService.checkAbility(req_user, cart, ACTIONS.UPDATE);
    console.log('Clear cart...');
    await cart.$set('products', []);
    cart.products = [];
    cart.total_cost = 0;
    await cart.save();
    console.log('Complete');
    return cart;
  }
  /**
   * Добавить товар в корзину
   * @param {ManageCartDto} dto - DTO для работы с корзиной
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async addProduct(dto: ManageCartDto, req_user: User): Promise<Cart> {
    const cart: Cart = await this.getOne(dto.user_id);
    this.abilityService.checkAbility(req_user, cart, ACTIONS.UPDATE);
    const product: Product = await this.productService.getOne(dto.product_id);
    const cartRelationCandidate: CartProducts =
      await this.cartProductsRepository.findOne({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
      });
    if(cartRelationCandidate) {
        cartRelationCandidate.count += dto.count;
        cart.total_cost += dto.count * product.total_price;
        await cartRelationCandidate.save();
        await cart.save();
        return cart;
    }
    console.log('Add product to cart...');
    if (!cart.products) {
      await cart.$set('products', []);
      cart.products = [];
    }
    await cart.$add('products', product.id);
    cart.products.push(product);
    cart.total_cost += dto.count * product.total_price;
    await cart.save();
    const cartRelation: CartProducts =
      await this.cartProductsRepository.findOne({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
      });
    if (!cartRelation) {
      throw new NotFoundException('Данный товар не найден в корзине');
    }
    cartRelation.count = dto.count;
    await cartRelation.save();
    console.log('Complete');
    return cart;
  }
  /**
   * Удалить товар из корзины
   * @param {ManageCartDto} dto - DTO для работы с корзиной
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async removeProduct(dto: ManageCartDto, req_user: User): Promise<Cart> {
    const cart: Cart = await this.getOne(dto.user_id);
    this.abilityService.checkAbility(req_user, cart, ACTIONS.UPDATE);
    const product: Product = await this.productService.getOne(dto.product_id);
    const cartRelation: CartProducts =
      await this.cartProductsRepository.findOne({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
      });
    if (!cartRelation) {
      throw new NotFoundException('Данный товар не найден в корзине');
    }
    console.log('Remove product from cart...');
    if (cartRelation.count > dto.count) {
      cartRelation.count -= dto.count;
      await cartRelation.save();
      cart.total_cost -= dto.count * product.total_price;
      await cart.save();
      return cart;
    }
    cart.total_cost -= cartRelation.count * product.total_price;
    await cart.$remove('products', product);
    await cart.save();
    console.log('Complete');
    return cart;
  }
}
