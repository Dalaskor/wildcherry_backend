import { Favorite } from '@app/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

export class FavoriteService {
  constructor(
    @InjectModel(Favorite) private favoriteRepository: typeof Favorite,
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
    });
    if (!favorite) {
      console.error('Раздел избранного не найден');
      throw new NotFoundException('Раздел избранного не найден');
    }
    console.log('Favorite was founded');
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
}
