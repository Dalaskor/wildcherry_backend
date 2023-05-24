import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from './user-roles.model';
import { User } from './user.model';

interface RoleCreationAttrs {
  value: string;
  desctiption: string;
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID роли пользователя' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'SELLER',
    description: 'Наименование роли пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
  @ApiProperty({
    example: 'Барыга',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @ApiProperty({
    type: User,
    isArray: true,
    description: 'Пользователи с этой ролью',
  })
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
