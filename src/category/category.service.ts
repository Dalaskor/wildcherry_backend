import { Category, CreateCategoryDto, UpdateCategoryDto } from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}
  /**
   * Создать категорию товаров
   * @param {CreateCategoryDto} dto - DTO для создания категории товаров
   * @returns {Category} - созданная категория
   * @throws BadRequestException - ошибка создания категории
   */
  async create(dto: CreateCategoryDto): Promise<Category> {
    const candidate = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (candidate) {
      throw new BadRequestException('Такая категория товаров уже существует');
    }
    console.log('Creating category...');
    const category: Category = await this.categoryRepository.create(dto);
    if (!category) {
      console.error('Ошибка создания категории');
      throw new BadRequestException('Ошибка создания категории');
    }
    console.log('Category was created');
    return category;
  }
  /**
   * Получить все категории товаров
   * @returns {Category[]} - массив категорий товаров
   */
  async getAll(): Promise<Category[]> {
    console.log('Found all categories...');
    const categories: Category[] = await this.categoryRepository.findAll();
    console.log('Found result');
    return categories;
  }
  /**
   * Получить одну категорию товаров
   * @param {number} id - ID категории
   * @returns {Category} - найденная категория
   */
  async getOne(id: number): Promise<Category> {
    console.log('Finding category...');
    const category: Category = await this.categoryRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) {
      console.error('Категория не найдена');
      throw new NotFoundException('Категория не найдена');
    }
    console.log('Category was founded');
    return category;
  }
  /**
   * Обновить данные категории товаров
   * @param {number} id - ID категории
   * @param {UpdateCategoryDto} dto - DTO для обновления данных категории товаров
   * @returns {Category} - Обновленная категория товаров
   */
  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category: Category = await this.getOne(id);
    console.log('Category changing...');
    category.name = dto.name ? dto.name : category.name;
    await category.save();
    console.log('Category was changed');
    const updatedCategory: Category = await this.categoryRepository.findByPk(
      category.id,
    );
    if (!updatedCategory) {
      console.error('Обновленная категория не найдена');
      throw new NotFoundException('Обновленная категория не найдена');
    }
    return updatedCategory;
  }
  /**
   * Удалить категорию товаров
   * @param {number} id - ID категории товаров
   * @returns {Category} - Удаленная категория товаров
   */
  async delete(id: number): Promise<Category> {
    const category: Category = await this.getOne(id);
    console.log('Removing category...');
    await category.destroy();
    console.log('Category was destroy');
    return category;
  }
}
