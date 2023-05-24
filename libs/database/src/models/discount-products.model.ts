import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Discount } from './discount.model';
import { Product } from './product.model';

@Table({ tableName: 'dicsount_products' })
export class DiscountProducts extends Model<DiscountProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Discount)
  @Column({ type: DataType.INTEGER })
  discountId: number;
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
}
