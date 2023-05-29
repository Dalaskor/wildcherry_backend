import { ACTIONS } from '@app/common';
import {
  Delivery,
  DeliveryProducts,
  ManageDeliveryDto,
  Product,
  User,
} from '@app/database';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AbilityService } from 'src/ability/ability.service';
import { ProductService } from 'src/product/product.service';

export class DeliveryService {
  constructor(
    @InjectModel(Delivery) private deliveryRepository: typeof Delivery,
    @InjectModel(DeliveryProducts)
    private deliveryProductsRepo: typeof DeliveryProducts,
    private productService: ProductService,
    private abilityService: AbilityService,
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
  async getOneCasl(id: number, req_user: User): Promise<Delivery> {
    const delivery: Delivery = await this.getOne(id);
    this.abilityService.checkAbility(req_user, delivery, ACTIONS.READ);
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
  /**
   * Добавить товар в доставку
   * @param {ManageCartDto} dto - DTO для работы с доставкой
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async addProduct(dto: ManageDeliveryDto, req_user: User): Promise<Delivery> {
    const delivery: Delivery = await this.getOne(dto.user_id);
    this.abilityService.checkAbility(req_user, delivery, ACTIONS.UPDATE);
    const product: Product = await this.productService.getOne(dto.product_id);
    const deliveryRelationCandidate: DeliveryProducts =
      await this.deliveryProductsRepo.findOne({
        where: {
          deliveryId: delivery.id,
          productId: product.id,
        },
      });
    if (deliveryRelationCandidate) {
      deliveryRelationCandidate.count += dto.count;
      delivery.total_cost += dto.count * product.total_price;
      await deliveryRelationCandidate.save();
      await delivery.save();
      return delivery;
    }
    console.log('Add product to delivery...');
    if (!delivery.products) {
      await delivery.$set('products', []);
      delivery.products = [];
    }
    await delivery.$add('products', product.id);
    delivery.products.push(product);
    delivery.total_cost += dto.count * product.total_price;
    await delivery.save();
    const deliveryRelation: DeliveryProducts =
      await this.deliveryProductsRepo.findOne({
        where: {
          deliveryId: delivery.id,
          productId: product.id,
        },
      });
    if (!deliveryRelation) {
      throw new NotFoundException('Данный товар не найден в корзине');
    }
    deliveryRelation.count = dto.count;
    await deliveryRelation.save();
    console.log('Complete');
    return delivery;
  }
  /**
   * Удалить товар из доставки
   * @param {ManageCartDto} dto - DTO для работы с доставкой
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async removeProduct(
    dto: ManageDeliveryDto,
    req_user: User,
  ): Promise<Delivery> {
    const delivery: Delivery = await this.getOne(dto.user_id);
    this.abilityService.checkAbility(req_user, delivery, ACTIONS.UPDATE);
    const product: Product = await this.productService.getOne(dto.product_id);
    const deliveryRelation: DeliveryProducts =
      await this.deliveryProductsRepo.findOne({
        where: {
          deliveryId: delivery.id,
          productId: product.id,
        },
      });
    if (!deliveryRelation) {
      throw new NotFoundException('Данный товар не найден в корзине');
    }
    console.log('Remove product from delivery...');
    if (deliveryRelation.count > dto.count) {
      deliveryRelation.count -= dto.count;
      await deliveryRelation.save();
      delivery.total_cost -= dto.count * product.total_price;
      await delivery.save();
      return delivery;
    }
    delivery.total_cost -= deliveryRelation.count * product.total_price;
    await delivery.$remove('products', product);
    await delivery.save();
    console.log('Complete');
    return delivery;
  }
  /**
   * Очистить раздел доставки
   * @param {number} userId - ID пользователя
   * @param {User} req_user - Пользователь сохраненый в req, во время JWT авторизации
   */
  async clear(userId: number, req_user: User) {
    const delivery: Delivery = await this.getOne(userId);
    this.abilityService.checkAbility(req_user, delivery, ACTIONS.UPDATE);
    console.log('Clear delivery...');
    await delivery.$set('products', []);
    delivery.products = [];
    delivery.total_cost = 0;
    await delivery.save();
    console.log('Complete');
    return delivery;
  }
}
