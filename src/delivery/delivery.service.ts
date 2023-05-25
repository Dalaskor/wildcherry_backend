import { Delivery } from '@app/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

export class DeliveryService {
  constructor(
    @InjectModel(Delivery) private deliveryRepository: typeof Delivery,
  ) {}
  /**
   * Создать раздел с доставкой пользователя
   * @returns {Delivery} - созданный раздел
   * @throws BadRequestException - ошибка создания раздела
   */
  async create(): Promise<Delivery> {
    console.log('Creating delivery...');
    const delivery: Delivery = await this.deliveryRepository.create();
    if (!delivery) {
      console.error('Ошибка создания доставки');
      throw new BadRequestException('Ошибка создания доставки');
    }
    console.log('Delivery was created');
    return delivery;
  }
  /**
   * Получить доставку пользователя
   * @param {number} id - ID пользователя
   * @returns {Delivery} - раздел доставки
   * @throws NotFountException - доставка не найдена
   */
  async getOne(id: number): Promise<Delivery> {
    console.log('Finding delivery...');
    const delivery: Delivery = await this.deliveryRepository.findOne({
      where: { fk_deliveryid: id },
      include: { all: true },
    });
    if (!delivery) {
      console.error('Доставка не найдена');
      throw new NotFoundException('Доставка не найдена');
    }
    console.log('Delivery was founded');
    return delivery;
  }
  /**
   * Удалить доставку пользователя
   * @param {number} id - ID пользователя
   * @returns {Delivery} - удаленная доставка пользователя
   */
  async delete(id: number): Promise<Delivery> {
    const delivery: Delivery = await this.getOne(id);
    console.log('Removing delivery...');
    await delivery.destroy();
    console.log('Delivery was destroy');
    return delivery;
  }
}
