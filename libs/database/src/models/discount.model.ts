import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DiscountProducts } from './discount-products.model';
import { Product } from './product.model';
import { User } from './user.model';

interface DiscountCreationAttrs {
  title: string;
  description: string;
  value: number;
}
@Table({ tableName: 'discounts' })
export class Discount extends Model<Discount, DiscountCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID акции' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Купи видеокарту', description: 'Заголовок акции' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @ApiProperty({ example: 'Вторую не получишь', description: 'Описание акции' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;
  @ApiProperty({ example: 50, description: 'Размер скидки' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  value: number;
  @ApiProperty({
    type: Product,
    isArray: true,
    description: 'Товары, на которые действует скидка',
  })
  @BelongsToMany(() => Product, () => DiscountProducts)
  products: Product[];
  @BelongsTo(() => User, 'fk_discountid')
  owner: User;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_discountid: number;
}
