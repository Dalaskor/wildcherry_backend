import {
  Cart,
  CreateProfileDto,
  CreateRoleDto,
  CreateUserDto,
  Delivery,
  Favorite,
  Profile,
  RegistrationDto,
  Role,
  User,
} from '@app/database';
import { JwtService } from '@nestjs/jwt';
import { DeliveryService } from 'src/delivery/delivery.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { ProfileService } from 'src/profile/profile.service';
import { RoleSerivce } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtOutput, JwtPayload, ROLES } from '@app/common';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleSerivce,
    private profileService: ProfileService,
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private deliveryService: DeliveryService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  /**
   * Авторизация пользователя
   * @param {CreateUserDto} dto - DTO для создания пользователя
   * @returns {JwtOutput} - возвращает JWT токены
   */
  async login(dto: CreateUserDto): Promise<JwtOutput> {
    const user: User = await this.validateUser(dto);
    return this.generateTokens(user);
  }
  /**
   * Регистрация пользователя
   * @param {RegistrationDto} dto - DTO для регистрации пользователя
   * @returns {User} - Созданный пользователь
   */
  async registration(dto: RegistrationDto): Promise<User> {
    console.log('[REGISTRATION] - START');
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    const userDto: CreateUserDto = {
      email: dto.email,
      password: hashPassword,
    };
    const profileDto: CreateProfileDto = {
      name: dto.name,
      surname: dto.surname,
      gender: dto.gender,
      phone: dto.phone,
      profile_img_url: dto.profile_img_url,
    };
    const user: User = await this.userService.create(userDto);
    console.log('[REGISTRATION] - created user');
    const profile: Profile = await this.profileService.create(profileDto);
    console.log('[REGISTRATION] - created profile');
    const cart: Cart = await this.cartService.create();
    console.log('[REGISTRATION] - created cart');
    const delivery: Delivery = await this.deliveryService.create();
    console.log('[REGISTRATION] - created delivery');
    const favorite: Favorite = await this.favoriteService.create();
    console.log('[REGISTRATION] - created favorite');
    await user.$set('profile', profile);
    await user.$set('cart', cart);
    await user.$set('delivery', delivery);
    await user.$set('favorite', favorite);
    console.log('[REGISTRATION] - END');
    return user;
  }
  /**
   * Регистрация пользователя с ролью USER
   * @param {RegistrationDto} dto - DTO для регистрации пользователя
   * @returns {JwtOutput} - JWT токены
   */
  async registrationUser(dto: RegistrationDto): Promise<JwtOutput> {
    const user: User = await this.registration(dto);
    let role: Role = await this.roleService.getByValueWithoutThrow(ROLES.USER);
    if (!role) {
      const roleDto: CreateRoleDto = {
        value: ROLES.USER,
        description:
          'Обычный пользователь в системе. Разрешено покупать товары и оставлять отзывы',
      };
      role = await this.roleService.create(roleDto);
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    await user.save();
    const tokens: JwtOutput = await this.generateTokens(user);
    const hashRefresh = await bcrypt.hash(tokens.refreshToken, 5);
    await this.userService.updateRefreshToken(user.id, hashRefresh);
    return tokens;
  }
  /**
   * Регистрация пользователя с ролью SELLER
   * @param {RegistrationDto} dto - DTO для регистрации пользователя
   * @returns {JwtOutput} - JWT токены
   */
  async registrationSeller(dto: RegistrationDto): Promise<JwtOutput> {
    const user: User = await this.registration(dto);
    let roleUser: Role = await this.roleService.getByValueWithoutThrow(
      ROLES.USER,
    );
    let roleSeller: Role = await this.roleService.getByValueWithoutThrow(
      ROLES.SELLER,
    );
    if (!roleUser) {
      const roleDto: CreateRoleDto = {
        value: ROLES.USER,
        description:
          'Обычный пользователь в системе. Разрешено покупать товары и оставлять отзывы',
      };
      roleUser = await this.roleService.create(roleDto);
    }
    if (!roleSeller) {
      const roleDto: CreateRoleDto = {
        value: ROLES.SELLER,
        description: 'Продавец на маркетплейсе. Может создавать товары',
      };
      roleSeller = await this.roleService.create(roleDto);
    }
    await user.$set('roles', [roleUser.id, roleSeller.id]);
    user.roles = [roleUser, roleSeller];
    await user.save();
    const tokens: JwtOutput = await this.generateTokens(user);
    const hashRefresh = await bcrypt.hash(tokens.refreshToken, 5);
    await this.userService.updateRefreshToken(user.id, hashRefresh);
    return tokens;
  }
  /**
   * Регистрация пользователя с ролью ADMIN
   * @param {RegistrationDto} dto - DTO для регистрации пользователя
   * @returns {JwtOutput} - JWT токены
   */
  async registrationAdmin(dto: RegistrationDto): Promise<JwtOutput> {
    const user: User = await this.registration(dto);
    let roleUser: Role = await this.roleService.getByValueWithoutThrow(
      ROLES.USER,
    );
    let roleSeller: Role = await this.roleService.getByValueWithoutThrow(
      ROLES.SELLER,
    );
    let roleAdmin: Role = await this.roleService.getByValueWithoutThrow(
      ROLES.ADMIN,
    );
    if (!roleUser) {
      const roleDto: CreateRoleDto = {
        value: ROLES.USER,
        description:
          'Обычный пользователь в системе. Разрешено покупать товары и оставлять отзывы',
      };
      roleUser = await this.roleService.create(roleDto);
    }
    if (!roleSeller) {
      const roleDto: CreateRoleDto = {
        value: ROLES.SELLER,
        description: 'Продавец на маркетплейсе. Может создавать товары',
      };
      roleSeller = await this.roleService.create(roleDto);
    }
    if (!roleAdmin) {
      const roleDto: CreateRoleDto = {
        value: ROLES.ADMIN,
        description: 'Права администратора',
      };
      roleAdmin = await this.roleService.create(roleDto);
    }
    await user.$set('roles', [roleUser.id, roleSeller.id, roleAdmin.id]);
    user.roles = [roleUser, roleSeller, roleAdmin];
    const tokens: JwtOutput = await this.generateTokens(user);
    const hashRefresh = await bcrypt.hash(tokens.refreshToken, 5);
    await this.userService.updateRefreshToken(user.id, hashRefresh);
    return tokens;
  }
  /**
   * Сбросить пользователю refreshToken
   * @param {number} user_id - ID пользователя
   */
  async logout(user_id: number): Promise<User> {
    return await this.userService.removeRefreshToken(user_id);
  }
  /**
   * Обновления токенов для пользователя
   * @param {number} user_id - ID пользователя
   * @param {string} refreshToken - Токен для обновления
   * @returns {JwtOutput} - возвращает JWT токены
   */
  async updateTokens(
    user_id: number,
    refreshToken: string,
  ): Promise<JwtOutput> {
    console.log('Updating JWT tokens...');
    const user: User = await this.userService.getOne(user_id);
    const userRefreshToken: string = user.refreshToken;
    if (!user || !userRefreshToken) {
      throw new ForbiddenException('Доступ запрещен');
    }
    const refreshTokenEquals = await bcrypt.compare(
      refreshToken,
      userRefreshToken,
    );
    if (!refreshTokenEquals) {
      throw new ForbiddenException('Доступ запрещен');
    }
    const tokens: JwtOutput = await this.generateTokens(user);
    const hashRefreshToken: string = await bcrypt.hash(tokens.refreshToken, 5);
    await this.userService.updateRefreshToken(user.id, hashRefreshToken);
    return tokens;
  }
  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getOneByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Неккоректные электронная почта или пароль',
    });
  }
  /**
   * Генерация JWT токенов
   * @param {User} user - пользователь для payload
   * @returns {JwtOutput} - возвращает JWT токены
   */
  private async generateTokens(user: User): Promise<JwtOutput> {
    console.log('Generate JWT tokens...');
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const refreshSettings = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    };
    const accessToken: string = await this.jwtService.signAsync(payload);
    const refreshToken: string = await this.jwtService.signAsync(
      payload,
      refreshSettings,
    );
    const output: JwtOutput = {
      accessToken,
      refreshToken,
    };
    console.log('JWT tokens was generated');
    return output;
  }
}
