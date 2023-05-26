import {
  CreateProductImagesDto,
  Product,
  UpdateProductImagesDto,
} from '@app/database';
import { ProductImages } from '@app/database/models/product-images.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(ProductImages) private productImgsRepo: typeof ProductImages,
  ) {}
  /**
   * Создать изображение товара
   * @param {CreateProductImagesDto} dto - DTO для создания изображения товара
   * @returns {ProductImages} - созданное изображение товара
   * @throws BadRequestException - ошибка создания изображения товара
   */
  async create(dto: CreateProductImagesDto): Promise<ProductImages> {
    console.log('Creating product image...');
    const productImg: ProductImages = await this.productImgsRepo.create(dto);
    if (!productImg) {
      console.error('ошибка создания изображения товара');
      throw new BadRequestException('ошибка создания изображения товара');
    }
    console.log('Product image was created');
    return productImg;
  }
  /**
   * Получить все изображения товаров
   * @returns {ProductImages[]} - массив изображений товаров
   */
  async getAll(): Promise<ProductImages[]> {
    console.log('Found all productImages...');
    const productImgs: ProductImages[] = await this.productImgsRepo.findAll();
    console.log('Found result');
    return productImgs;
  }
  /**
   * Получить все изображения по товару
   * @param {number} product - ID товара
   * @returns {ProductImages[]} - массив изображений товаров
   */
  async getAllByProduct(product: number): Promise<ProductImages[]> {
    console.log('Found all productImages by product...');
    const productImgs: ProductImages[] = await this.productImgsRepo.findAll({
      include: {
        model: Product,
        where: { id: product },
      },
    });
    console.log('Found result');
    return productImgs;
  }
  /**
   * Получить одно изображение товара по ID
   * @param {number} id - ID изображения товара
   * @returns {ProductImages} - изображение товара
   * @throws NotFountException - изображение товара не найдено
   */
  async getOne(id: number): Promise<ProductImages> {
    console.log('Finding productImg...');
    const productImg: ProductImages = await this.productImgsRepo.findByPk(id);
    if (!productImg) {
      console.error('Изображение товара не найдено');
      throw new NotFoundException('Изображение товара не найдено');
    }
    console.log('ProductImg was founded');
    return productImg;
  }
  /**
   * Обновить данные изображения товара
   * @param {number} id - ID изображения товара
   * @param {UpdateProductImagesDto} dto - DTO для обновления данных изображения товара
   * @returns {ProductImages} - обновленное изображение товара
   */
  async update(
    id: number,
    dto: UpdateProductImagesDto,
  ): Promise<ProductImages> {
    const productImg: ProductImages = await this.getOne(id);
    console.log('ProductImg changing...');
    productImg.url = dto.url ? dto.url : productImg.url;
    await productImg.save();
    console.log('ProductImg was changed');
    const updatedProductImg: ProductImages =
      await this.productImgsRepo.findByPk(productImg.id);
    if (!updatedProductImg) {
      console.error('Обновленное изображение не найдено');
      throw new NotFoundException('Обновленное изображение не найдено');
    }
    return updatedProductImg;
  }
  /**
   * Удалить изображение товара
   * @param {number} id - ID изображения
   * @returns {ProductImages} - Удаленное изображение
   */
  async delete(id: number): Promise<ProductImages> {
    const productImg: ProductImages = await this.getOne(id);
    console.log('Removing productImg...');
    await productImg.destroy();
    console.log('ProductImg was destroy');
    return productImg;
  }
}
