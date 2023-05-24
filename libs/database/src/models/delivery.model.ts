import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { DeliveryProducts } from "./delivery-products.model";
import { Product } from "./product.model";
import { User } from "./user.model";

@Table({ tableName: 'deliveries' })
export class Delivery extends Model<Delivery> {
  @ApiProperty({ example: 1, description: 'ID раздела доставки' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 1337,
    description: 'Итоговая стоимость товаров в доставке',
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
  @BelongsTo(() => User, 'fk_deliveryid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_deliveryid: number;
  @ApiProperty({
    type: Product,
    isArray: true,
    description: 'Товары в доставке',
  })
  @BelongsToMany(() => Product, () => DeliveryProducts)
  products: Product[];
}
