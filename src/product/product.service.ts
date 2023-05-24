import { CreateProductDto, Product, UpdateProductDto } from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}
  /**
   * Создать товар
   * @param {CreateProductDto} dto - DTO для создания товара
   * @returns {Product} - созданный товар
   * @throws BadRequestException - ошибка создания товара
   */
  async create(dto: CreateProductDto): Promise<Product> {
    console.log('Creating product...');
    const product: Product = await this.productRepository.create(dto);
    if (!product) {
      console.error('Ошибка создания товара');
      throw new BadRequestException('Ошибка создания товара');
    }
    console.log('Product was created');
    return product;
  }
  /**
   * Получить все товары
   * @returns {Product[]} - массив товаров
   */
  async getAll(): Promise<Product[]> {
    console.log('Find all products...');
    const products: Product[] = await this.productRepository.findAll();
    console.log('Found result');
    return products;
  }
  /**
   * Получить один товар
   * @param {number} id - ID товара
   * @returns {Product} - найденный товар
   */
  async getOne(id: number): Promise<Product> {
    console.log('Finding product...');
    const product: Product = await this.productRepository.findByPk(id);
    if (!product) {
      console.error('Товар не найден');
      throw new NotFoundException('Товар не найден');
    }
    console.log('Product was founded');
    return product;
  }
  /**
   * Обновить данные модели Product
   * @param {number} id - ID товара
   * @param {UpdateUserDto} dto - DTO для обновления данных Product
   * @returns {Product} - Обновленный товар
   */
  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product: Product = await this.getOne(id);
    console.log('Product changing...');
    product.name = dto.name ? dto.name : product.name;
    product.description = dto.description ? dto.description : dto.description;
    product.price = dto.price ? dto.price : dto.price;
    await product.save();
    console.log('Product was changed');
    const updatedProduct: Product = await this.productRepository.findByPk(
      product.id,
    );
    if (!updatedProduct) {
      console.error('Обновленный товар не найден');
      throw new NotFoundException('Обновленный товар не найден');
    }
    return product;
  }
  /**
   * Удалить Product
   * @param {number} id - ID пользователя
   * @returns {Product} - Удаленный товар
   */
  async delete(id: number): Promise<Product> {
    const product: Product = await this.getOne(id);
    console.log('Removing product...');
    await product.destroy();
    console.log('Product was destroy');
    return product;
  }
}
