import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Delivery } from "./delivery.model";

@Table({ tableName: 'delivery_products' })
export class DeliveryProducts extends Model<DeliveryProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Delivery)
  @Column({ type: DataType.INTEGER })
  deliveryId: number;
  @ForeignKey(() => Delivery)
  @Column({ type: DataType.INTEGER })
  productId: number;
  @ApiProperty({
    example: 1,
    description: 'Количество данного товара в доставке',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  count: number;
}
