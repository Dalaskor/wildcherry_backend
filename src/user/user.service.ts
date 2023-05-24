import { CreateUserDto, UpdateUserDto, User } from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  /**
   * Создать пользователя
   * @param {CreateUserDto} dto - DTO для создания пользователя
   * @returns {User} - созданный пользователь
   * @throws BadRequestException - ошибка создания пользователя
   */
  async create(dto: CreateUserDto): Promise<User> {
    console.log('Creating user...');
    const user: User = await this.userRepository.create(dto);
    if (!user) {
      console.error('Ошибка создания пользователя');
      throw new BadRequestException('Ошибка создания пользователя');
    }
    console.log('User was created');
    return user;
  }
  /**
   * Получить всех пользователей
   * @returns {User[]} - массив пользователей
   */
  async getAll(): Promise<User[]> {
    console.log('Found all users...');
    const users: User[] = await this.userRepository.findAll();
    console.log('Found result');
    return users;
  }
  /**
   * Получить одного User
   * @param {number} id - ID пользователя
   * @returns {User} - пользователь
   */
  async getOne(id: number): Promise<User> {
    console.log('Finding user...');
    const user: User = await this.userRepository.findByPk(id);
    if (!user) {
      console.error('Пользователь не найден');
      throw new NotFoundException('Пользователь не найден');
    }
    console.log('User was founded');
    return user;
  }
  /**
   * Обновить данные модели User
   * @param {number} id - ID пользователя
   * @param {UpdateUserDto} dto - DTO для обновления данных User
   * @returns {User} - Обновленный пользователь
   */
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user: User = await this.getOne(id);
    console.log('User changing...');
    user.password = dto.password ? dto.password : user.password;
    await user.save();
    console.log('User was changed');
    const updatedUser: User = await this.userRepository.findByPk(user.id);
    if (!updatedUser) {
      console.error('Обновленный пользователь не найден');
      throw new NotFoundException('Обновленный пользователь не найден');
    }
    return updatedUser;
  }
  /**
   * Удалить User
   * @param {number} id - ID пользователя
   * @returns {User} - Удаленный пользователь
   */
  async delete(id: number): Promise<User> {
    const user: User = await this.getOne(id);
    console.log('Removing user...');
    await user.destroy();
    console.log('User was destroy');
    return user;
  }
}
