import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { CartProducts } from './cart-products.model';
import { Product } from './product.model';
import { User } from './user.model';

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
  @ApiProperty({ example: 1, description: 'ID корзины' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 1337,
    description: 'Итоговая стоимость товаров в корзине',
    default: 0,
  })
  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  total_cost: number;
  @ApiProperty({
      type: User,
      description: 'Пользователь, которому принадлежит этот раздел'
  })
  @BelongsTo(() => User, 'fk_cartid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_cartid: number;
  @ApiProperty({
    type: Product,
    isArray: true,
    description: 'Товары в корзине',
  })
  @BelongsToMany(() => Product, () => CartProducts)
  products: Product[];
}
