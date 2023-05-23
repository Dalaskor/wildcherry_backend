import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Profile } from './profile.model';
import { Role } from './role.model';
import { UserRoles } from './user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Электронная почта пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({
    example: 'password1234',
    description: 'Пароль пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @ApiProperty({
    type: Role,
    isArray: true,
    description: 'Роли пользователя',
  })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
  @ApiProperty({
    type: Profile,
    description: 'Профиль пользователя',
  })
  @HasOne(() => Profile, 'fk_profileid')
  profile: Profile;
}
