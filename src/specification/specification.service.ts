import {
  CreateSpecificationDto,
  Specification,
  UpdateSpecificationDto,
} from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SpecificationService {
  constructor(
    @InjectModel(Specification)
    private specificationRepository: typeof Specification,
  ) {}
  /**
   * Создать характеристики товара
   * @param {CreateSpecificationDto} dto - DTO для создания характеристик товара
   * @returns {Specification} - созданные характеристики товара
   * @throws BadRequestException - ошибка создания характеристик товара
   */
  async create(dto: CreateSpecificationDto): Promise<Specification> {
    console.log('Creating specification...');
    const specification: Specification =
      await this.specificationRepository.create(dto);
    if (!specification) {
      console.error('Ошибка создания характеристик товара');
      throw new BadRequestException('Ошибка создания характеристик товара');
    }
    console.log('Specification was created');
    return specification;
  }
  /**
   * Получить все характериситики
   * @returns {Specification[]} - массив характеристик
   */
  async getAll(): Promise<Specification[]> {
    console.log('Found all specification...');
    const specifications: Specification[] =
      await this.specificationRepository.findAll();
    console.log('Found result');
    return specifications;
  }
  /**
   * Получить одну характеристику
   * @param {number} id - ID товара
   * @returns {Specification} - характеристика
   */
  async getOne(id: number): Promise<Specification> {
    console.log('Finding specification...');
    const specification: Specification =
      await this.specificationRepository.findOne({
        where: { fk_specificationid: id },
      });
    if (!specification) {
      console.error('Характеристика не найдена');
      throw new NotFoundException('Характеристика не найдена');
    }
    console.log('Specification was founded');
    return specification;
  }
  /**
   * Обновить данные характеристики
   * @param {number} id - ID товара
   * @param {UpdateSpecificationDto} dto - DTO для обновления характеристики
   * @returns {Specification} - обновленная характеристика
   */
  async update(
    id: number,
    dto: UpdateSpecificationDto,
  ): Promise<Specification> {
    const specification: Specification = await this.getOne(id);
    console.log('Specification changing...');
    specification.width = dto.width ? dto.width : specification.width;
    specification.lenght = dto.lenght ? dto.lenght : specification.lenght;
    specification.weight = dto.weight ? dto.weight : specification.weight;
    specification.height = dto.height ? dto.height : specification.height;
    await specification.save();
    console.log('Specification was changed');
    const updatedSpecification: Specification =
      await this.specificationRepository.findByPk(specification.id);
    if (!updatedSpecification) {
      console.error('Обновленная характеристика не найдена');
      throw new NotFoundException('Обновленная характеристика не найдена');
    }
    return updatedSpecification;
  }
  /**
   * Удалить характеристику
   * @param {number} id - ID характеристики
   * @returns {Specification} - Удаленная характеристика
   */
  async delete(id: number): Promise<Specification> {
    const specification: Specification = await this.getOne(id);
    console.log('Removing specification...');
    await specification.destroy();
    console.log('specification was destroy');
    return specification;
  }
}
