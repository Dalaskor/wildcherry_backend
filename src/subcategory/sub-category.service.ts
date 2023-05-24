import {
  CreateSubCategoryDto,
  SubCategory,
  UpdateCategoryDto,
} from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory) private subCategoryRepository: typeof SubCategory,
  ) {}
  /**
   * Создать подкатегорию товаров
   * @param {CreateSubCategoryDto} dto - DTO для создания подкатегории товаров
   * @returns {SubCategory} - созданная подкатегория товаров
   * @throws BadRequestException - ошибка создания подкатегории товаров
   */
  async create(dto: CreateSubCategoryDto): Promise<SubCategory> {
    console.log('Creating sub-category...');
    const candidate = await this.subCategoryRepository.findOne({
      where: { name: dto.name },
    });
    if (candidate) {
      throw new BadRequestException(
        'Такая подкатегория товаров уже существует',
      );
    }
    const subCategory: SubCategory = await this.subCategoryRepository.create(
      dto,
    );
    if (!subCategory) {
      console.error('Ошибка создания подкатегории товаров');
      throw new BadRequestException('Ошибка создания подкатегории товаров');
    }
    console.log('sub-catogry was created');
    return subCategory;
  }
  /**
   * Получить все подкатегории товаров
   * @returns {SubCategory[]} - массив подкатегорий
   */
  async getAll(): Promise<SubCategory[]> {
    console.log('Found all sub-categories...');
    const subCategory: SubCategory[] =
      await this.subCategoryRepository.findAll();
    console.log('Found result');
    return subCategory;
  }
  /**
   * Получить одну подкатегорию товаров
   * @param {number} id - ID подкатегории товаров
   * @returns {SubCategory} - найденная подкатегория товаров
   */
  async getOne(id: number): Promise<SubCategory> {
    console.log('Finding sub-cateogory...');
    const subCategory: SubCategory = await this.subCategoryRepository.findByPk(
      id,
    );
    if (!subCategory) {
      console.error('Подкатегория товаров не найден');
      throw new NotFoundException('Подкатегория товаров не найден');
    }
    console.log('sub-category was founded');
    return subCategory;
  }
  /**
   * Обновить данные подкатегории товаров
   * @param {number} id - ID подкатегории товаров
   * @param {UpdateCategoryDto} dto - DTO для обновления данных User
   * @returns {SubCategory} - Обновленная категория товаров
   */
  async update(id: number, dto: UpdateCategoryDto): Promise<SubCategory> {
    const subCategory: SubCategory = await this.getOne(id);
    console.log('Sub-category changing...');
    subCategory.name = dto.name ? dto.name : subCategory.name;
    await subCategory.save();
    console.log('Sub-category was changed');
    const updatedSubCategory: SubCategory =
      await this.subCategoryRepository.findByPk(subCategory.id);
    if (!updatedSubCategory) {
      console.error('Обновленная подкатегория товаров не найдена');
      throw new NotFoundException(
        'Обновленная подкатегория товаров не найдена',
      );
    }
    return updatedSubCategory;
  }
  /**
   * Удалить подкатегорию товаров
   * @param {number} id - ID подкатегории товаров
   * @returns {SubCategory} - Удаленный пользователь
   */
  async delete(id: number): Promise<SubCategory> {
    const subCategory: SubCategory = await this.getOne(id);
    console.log('Removing sub-category...');
    await subCategory.destroy();
    console.log('Sub-category was destroy');
    return subCategory;
  }
}
