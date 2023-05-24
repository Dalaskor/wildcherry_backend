import { CreateRoleDto, Role, UpdateRoleDto } from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoleSerivce {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  /**
   * Создать роль
   * @param {CreateRoleDto} dto - DTO для создания роли
   * @returns {Role} - созданная роль
   * @throws BadRequestException - ошибка создания роли
   */
  async create(dto: CreateRoleDto): Promise<Role> {
    console.log('Creating role...');
    const role: Role = await this.roleRepository.create(dto);
    if (!role) {
      console.error('Ошибка создания роли');
      throw new BadRequestException('Ошибка создания роли');
    }
    console.log('Role was created');
    return role;
  }
  /**
   * Получить все роли
   * @returns {Role[]} - массив ролей
   */
  async getAll(): Promise<Role[]> {
    console.log('Found all roles...');
    const roles: Role[] = await this.roleRepository.findAll();
    console.log('Found result');
    return roles;
  }
  /**
   * Получить одну Роль
   * @param {number} id - ID роли
   * @returns {Role} - роль
   */
  async getOne(id: number): Promise<Role> {
    console.log('Finding role...');
    const role: Role = await this.roleRepository.findByPk(id);
    if (!role) {
      console.error('Роль не найдена');
      throw new NotFoundException('Роль не найдена');
    }
    console.log('Role was founded');
    return role;
  }
  /**
   * Обновить данные модели Role
   * @param {number} id - ID пользователя
   * @param {UpdateRoleDto} dto - DTO для обновления данных Role
   * @returns {Role} - Обновленная роль
   */
  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role: Role = await this.getOne(id);
    console.log('Role changing...');
    role.value = dto.value ? dto.value : role.value;
    role.description = dto.description ? dto.description : role.description;
    await role.save();
    console.log('Role was changed');
    const updatedRole: Role = await this.roleRepository.findByPk(role.id);
    if (!updatedRole) {
      console.error('Обновленная роль не найдена');
      throw new NotFoundException('Обновленная роль не найдена');
    }
    return updatedRole;
  }
  /**
   * Удалить Role
   * @param {number} id - ID пользователя
   * @returns {Role} - Удаленная рольк
   */
  async delete(id: number): Promise<Role> {
    const role: Role = await this.getOne(id);
    console.log('Removing role...');
    await role.destroy();
    console.log('Role was destroy');
    return role;
  }
}
