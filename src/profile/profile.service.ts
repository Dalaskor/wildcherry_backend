import { ACTIONS } from '@app/common';
import {
  CreateProfileDto,
  Profile,
  UpdateProfileDto,
  User,
} from '@app/database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AbilityService } from 'src/ability/ability.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
    private abilityService: AbilityService,
  ) {}
  /**
   * Создать профиль пользователя
   * @param {CreateProfileDto} dto - DTO для создания профиля пользователя
   * @returns {Profile} - созданный профиль
   * @throws BadRequestException - ошибка создания профиля пользователя
   */
  async create(dto: CreateProfileDto): Promise<Profile> {
    console.log('Creating profile...');
    const profile: Profile = await this.profileRepository.create(dto);
    if (!profile) {
      console.error('Ошибка создания профиля пользователя');
      throw new BadRequestException('Ошибка создания профиля пользователя');
    }
    console.log('Profile was created');
    return profile;
  }
  /**
   * Получить все профили пользователей
   * @returns {Profile[]} - массив профилей
   */
  async getAll(): Promise<Profile[]> {
    console.log('Found all profiles...');
    const profiles: Profile[] = await this.profileRepository.findAll();
    console.log('Found result');
    return profiles;
  }
  /**
   * Получить оидин профиль
   * @param {number} id - ID пользователя
   * @returns {Profile} - профиль пользователя
   */
  async getOne(id: number): Promise<Profile> {
    console.log('Finding profile...');
    const profile: Profile = await this.profileRepository.findOne({
      where: { fk_profileid: id },
      include: { all: true },
    });
    if (!profile) {
      console.error('Профиль не найден');
      throw new NotFoundException('Профиль не найден');
    }
    console.log('Profile was founded');
    return profile;
  }
  /**
   * Обновить данные модели Profile
   * @param {number} id - ID пользователя
   * @param {UpdateProfileDto} dto - DTO для обновления данных профиля
   * @returns {Profile} - Обновленный профиль
   */
  async update(id: number, dto: UpdateProfileDto, user: User): Promise<Profile> {
    const profile: Profile = await this.getOne(id);
    this.abilityService.checkAbility(user, profile, ACTIONS.UPDATE);
    console.log('Profile changing...');
    profile.name = dto.name ? dto.name : profile.name;
    profile.surname = dto.surname ? dto.surname : profile.surname;
    profile.gender = dto.gender ? dto.gender : profile.gender;
    profile.phone = dto.phone ? dto.phone : profile.phone;
    profile.profile_img_url = dto.profile_img_url
      ? dto.profile_img_url
      : profile.profile_img_url;
    await profile.save();
    console.log('Profile was changed');
    const updatedProfile: Profile = await this.profileRepository.findByPk(
      profile.id,
    );
    if (!updatedProfile) {
      console.error('Обновленный профиль не найден');
      throw new NotFoundException('Обновленный профиль не найден');
    }
    return updatedProfile;
  }
  /**
   * Удалить Profile
   * @param {number} id - ID пользователя
   * @returns {User} - Удаленный профиль
   */
  async delete(id: number): Promise<Profile> {
    const profile: Profile = await this.getOne(id);
    console.log('Removing profile...');
    await profile.destroy();
    console.log('Profile was destroy');
    return profile;
  }
}
