import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { FavoriteProducts } from './favorite-products.model';
import { Product } from './product.model';
import { User } from './user.model';

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite> {
  @ApiProperty({ example: 1, description: 'ID избранного' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    type: Product,
    isArray: true,
    description: 'Товары в избранном',
  })
  @BelongsToMany(() => Product, () => FavoriteProducts)
  products: Product[];
  @ApiProperty({
    type: User,
    description: 'Пользователь, которому принадлежит этот раздел',
  })
  @BelongsTo(() => User, 'fk_favoriteid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_favoriteid: number;
}
