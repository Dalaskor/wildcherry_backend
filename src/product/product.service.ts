import {
  CreateProductDto,
  Product,
  RegisterProductDto,
  Specification,
  SubCategory,
  UpdateProductDto,
  User,
} from '@app/database';
import { ProductImages } from '@app/database/models/product-images.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImagesService } from 'src/product_images/product-images.service';
import { SpecificationService } from 'src/specification/specification.service';
import { SubCategoryService } from 'src/subcategory/sub-category.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private userService: UserService,
    private subCategoryService: SubCategoryService,
    private specificationService: SpecificationService,
    private productImgService: ProductImagesService,
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
    const product: Product = await this.productRepository.findOne({
      where: { id },
      include: { all: true },
    });
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
  /**
   * Регистрация нового товара в системе
   * @param {RegisterProductDto} dto - DTO для регистрации нового товара
   */
  async registerNew(dto: RegisterProductDto): Promise<Product> {
    const user: User = await this.userService.getOne(dto.owner);
    const subCategory: SubCategory = await this.subCategoryService.getOne(
      dto.sub_category,
    );
    const product: Product = await this.create({ ...dto });
    const specification: Specification = await this.specificationService.create(
      { ...dto },
    );
    const imgs: ProductImages[] = [];
    const imgsId: number[] = [];
    for (const item of dto.images) {
      const img: ProductImages = await this.productImgService.create({
        url: item,
      });
      imgs.push(img);
      imgsId.push(img.id);
    }
    product.$set('specification', specification);
    product.specification = specification;
    product.$set('images', imgsId);
    product.images = imgs;
    product.sub_category = subCategory;
    product.owner = user;
    if (!subCategory.products) {
      subCategory.$set('products', []);
      subCategory.products = [];
    }
    if (!user.products) {
      user.$set('products', []);
      user.products = [];
    }
    subCategory.$add('products', product.id);
    subCategory.products.push(product);
    user.$add('products', product.id);
    user.products.push(product);
    await subCategory.save();
    await product.save();
    await user.save();
    return product;
  }
}
