import { ACTIONS } from '@app/common';
import { Favorite, User } from '@app/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AbilityService } from 'src/ability/ability.service';
import { ProductService } from 'src/product/product.service';

export class FavoriteService {
  constructor(
    @InjectModel(Favorite) private favoriteRepository: typeof Favorite,
    private productService: ProductService,
    private abilityService: AbilityService,
  ) {}
  /**
   * Создать раздел избранного
   * @returns {Favorite} - созданный раздел избранного
   * @throws BadRequestException - ошибка создания раздела
   */
  async create(): Promise<Favorite> {
    console.log('Creating favorite...');
    const favorite: Favorite = await this.favoriteRepository.create();
    if (!favorite) {
      console.error('Ошибка создания раздела избранного');
      throw new BadRequestException('Ошибка создания раздела избранного');
    }
    console.log('Favorite was created');
    return favorite;
  }
  /**
   * Получить раздел избранного по ID
   * @param {number} id - ID пользователя
   * @returns {Favorite} - избранный раздел пользователя
   * @throws NotFountException - раздел не найден
   */
  async getOne(id: number): Promise<Favorite> {
    console.log('Finding favorite...');
    const favorite: Favorite = await this.favoriteRepository.findOne({
      where: { fk_favoriteid: id },
      include: { all: true },
    });
    if (!favorite) {
      console.error('Раздел избранного не найден');
      throw new NotFoundException('Раздел избранного не найден');
    }
    console.log('Favorite was founded');
    return favorite;
  }
  async getOneCasl(id: number, req_user: User): Promise<Favorite> {
    const favorite = await this.getOne(id);
    this.abilityService.checkAbility(req_user, favorite, ACTIONS.READ);
    return favorite;
  }
  /**
   * Удалить раздел избранного
   * @param {number} id - ID пользователя
   * @returns {Favorite} - Удаленный раздел
   */
  async delete(id: number): Promise<Favorite> {
    const favorite: Favorite = await this.getOne(id);
    console.log('Removing favorite...');
    await favorite.destroy();
    console.log('Favorite was destroy');
    return favorite;
  }
  /**
   * Добавить товар в избранное
   * @param {number} userId - ID пользователя
   * @param {number} productId - ID товара
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async addProduct(
    userId: number,
    productId: number,
    req_user: User,
  ): Promise<Favorite> {
    const favorite = await this.getOne(userId);
    this.abilityService.checkAbility(req_user, favorite, ACTIONS.UPDATE);
    const product = await this.productService.getOne(productId);
    console.log('Add product to favorite...');
    if (!favorite.products) {
      await favorite.$set('products', []);
      favorite.products = [];
    }
    await favorite.$add('products', product.id);
    favorite.products.push(product);
    await favorite.save();
    console.log('Complete');
    return favorite;
  }
  /**
   * Удалить товар из изранного
   * @param {number} userId - ID пользователя
   * @param {number} productId - ID товара
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async removeProduct(
    userId: number,
    productId: number,
    req_user: User,
  ): Promise<Favorite> {
    const favorite = await this.getOne(userId);
    this.abilityService.checkAbility(req_user, favorite, ACTIONS.UPDATE);
    const product = await this.productService.getOne(productId);
    console.log('Remove product to favorite...');
    await favorite.$remove('products', product.id);
    console.log('Complete');
    return favorite;
  }
  /**
   * Очистить избранное
   * @param {number} userId - ID пользователя
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async clear(userId: number, req_user: User) {
    const favorite = await this.getOne(userId);
    this.abilityService.checkAbility(req_user, favorite, ACTIONS.UPDATE);
    console.log('Clear favorite...');
    await favorite.$set('products', []);
    favorite.products = [];
    await favorite.save();
    console.log('Complete');
    return favorite;
  }
}
