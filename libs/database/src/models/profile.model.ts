import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

interface ProfileCreationAttrs {}
@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID профиля пользователя' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'Джотаро',
    description: 'Имя пользователя',
    nullable: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;
  @ApiProperty({
    example: 'Куджо',
    description: 'Фамилия пользователя',
    nullable: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  surname: string;
  @ApiProperty({
    example: 'мужской',
    description: 'Пол пользователя',
    nullable: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gender: string;
  @ApiProperty({
    example: '88005553535',
    description: 'Номер телефона пользователя',
    nullable: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;
  @ApiProperty({
    example:
      'https://i1.sndcdn.com/avatars-KHCJysyj9xSJNBhs-hTFe8g-t500x500.jpg',
    description: 'URL до изображения профиля пользователя',
    nullable: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_img_url: string;
  @ApiProperty({
    type: User,
    description: 'Пользователь',
  })
  @BelongsTo(() => User, 'fk_profileid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_profileid: number;
}
