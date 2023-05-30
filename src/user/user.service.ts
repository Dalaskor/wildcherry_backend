import { ACTIONS, ORDER } from '@app/common';
import {
  CreateUserDto,
  PagUsersDto,
  Profile,
  Role,
  UpdateUserDto,
  User,
  UserAddRoleDto,
} from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AbilityService } from 'src/ability/ability.service';
import { RoleSerivce } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleSerivce,
    private abilityService: AbilityService,
  ) {}
  /**
   * Создать пользователя
   * @param {CreateUserDto} dto - DTO для создания пользователя
   * @returns {User} - созданный пользователь
   * @throws BadRequestException - ошибка создания пользователя
   */
  async create(dto: CreateUserDto): Promise<User> {
    console.log('Creating user...');
    const candidate = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new BadRequestException('Данный email уже занят');
    }
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
  async getAll(dto: PagUsersDto): Promise<User[]> {
    console.log('Found all users...');
    const page: number = dto.page ? dto.page : 1;
    const take: number = dto.take ? dto.take : 10;
    const skip = (page - 1) * take;
    const order: string = dto.order ? dto.order : ORDER.ASC;
    let roleWhere: any = {};
    if (dto.role) {
      roleWhere = {
        value: dto.role,
      };
    }
    const users: User[] = await this.userRepository.findAll({
      include: [
        {
          model: Role,
          where: roleWhere,
        },
        {
          model: Profile,
        },
      ],
      order: [['email', order]],
      offset: skip,
      limit: take,
      group: ['User.id', 'User.email'],
    });
    console.log('Found result');
    return users;
  }
  /**
   * Получить одного User
   * @param {number} id - ID пользователя
   * @returns {User} - пользователь
   * @throws NotFountException - пользователь не найден
   */
  async getOne(id: number): Promise<User> {
    console.log('Finding user...');
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!user) {
      console.error('Пользователь не найден');
      throw new NotFoundException('Пользователь не найден');
    }
    console.log('User was founded');
    return user;
  }
  /**
   * Получить одного User с проверкой CASL
   * @param {number} id - ID пользователя
   * @returns {User} - пользователь
   * @throws NotFountException - пользователь не найден
   */
  async getOneWithCasl(id: number, req_user: User): Promise<User> {
    const user: User = await this.getOne(id);
    this.abilityService.checkAbility(req_user, user, ACTIONS.READ);
    return user;
  }
  /**
   * Обновить данные модели User
   * @param {number} id - ID пользователя
   * @param {UpdateUserDto} dto - DTO для обновления данных User
   * @returns {User} - Обновленный пользователь
   */
  async update(id: number, dto: UpdateUserDto, req_user: User): Promise<User> {
    const user: User = await this.getOne(id);
    this.abilityService.checkAbility(req_user, user, ACTIONS.UPDATE);
    console.log('User changing...');
    user.password = dto.password ? dto.password : user.password;
    await user.save();
    console.log('User was changed');
    const updatedUser: User = await this.getOne(user.id);
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
  /**
   * Обновить refreshToken у пользователя
   * @param {number} id - ID пользователя
   * @param {string} hashToken - новый захешированный токен
   * @returns {User} - Обновленный пользователь
   */
  async updateRefreshToken(id: number, hashToken: string): Promise<User> {
    const user: User = await this.getOne(id);
    user.refreshToken = hashToken;
    await user.save();
    const updatedUser: User = await this.getOne(user.id);
    return updatedUser;
  }
  /**
   * Удалить refreshToken у пользователя
   * @param {number} id - ID пользователя
   * @returns {User} - Обновленный пользователь
   */
  async removeRefreshToken(id: number): Promise<User> {
    const user: User = await this.getOne(id);
    user.refreshToken = null;
    await user.save();
    const updatedUser: User = await this.getOne(user.id);
    return updatedUser;
  }
  /**
   * Получить пользователя по его электронной почте
   * @param {string} email - электронная почта пользователя
   * @returns {User} - Найденный пользователь
   */
  async getOneByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { email },
      include: { model: Role },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }
  /**
   * Добавить роль пользователию
   * @param {UserAddRoleDto} dto - DTO для добавления роли пользователю
   * @returns {User} - Пользователь
   */
  async addRole(dto: UserAddRoleDto): Promise<User> {
    const user: User = await this.getOne(dto.user_id);
    const role: Role = await this.roleService.getOne(dto.role_id);
    if (!user.roles) {
      await user.$set('roles', []);
      user.roles = [];
    }
    await user.$add('roles', role.id);
    user.roles.push(role);
    await user.save();
    return user;
  }
  /**
   * Удалить роль пользователию
   * @param {UserAddRoleDto} dto - DTO для добавления роли пользователю
   * @returns {User} - Пользователь
   */
  async removeRole(dto: UserAddRoleDto): Promise<User> {
    const user: User = await this.getOne(dto.user_id);
    const role: Role = await this.roleService.getOne(dto.role_id);
    await user.$remove('roles', role.id);
    return user;
  }
}
