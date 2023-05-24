import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';

interface SpecificationCreationAttrs {}
@Table({ tableName: 'specifications' })
export class Specification extends Model<
  Specification,
  SpecificationCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID характеристик товара' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 10.1,
    description: 'Длина товара',
    nullable: true,
  })
  @Column({ type: DataType.DOUBLE })
  lenght: number;
  @ApiProperty({
    example: 10.1,
    description: 'Ширина товара',
    nullable: true,
  })
  @Column({ type: DataType.DOUBLE })
  width: number;
  @ApiProperty({
    example: 10.1,
    description: 'Высота товара',
    nullable: true,
  })
  @Column({ type: DataType.DOUBLE })
  height: number;
  @ApiProperty({
    example: 10.1,
    description: 'Вес товара',
    nullable: true,
  })
  @Column({ type: DataType.DOUBLE })
  weight: number;
  @ApiProperty({
      type: Product,
      description: 'Товар'
  })
  @BelongsTo(() => Product, 'fk_specificationid')
  product: Product;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_specificationid: number;
}
