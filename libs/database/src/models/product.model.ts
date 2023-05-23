import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductImages } from './product-images.model';
import { Specification } from './specification.model';
import { SubCategory } from './sub-category.model';

interface ProductCreationAttrs {
  name: string;
  description: string;
  price: number;
}
@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID товара' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'Видеокарта Palit GeForce RTX 3060 Dual OC (LHR)',
    description: 'Название товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({
    example:
      'Видеокарта Palit GeForce RTX 3060 DUAL OC (LHR) [NE63060T19K9-190AD] представляет собой высокопроизводительное решение для профессиональных рабочих станций и игровых систем.',
    description: 'Описание товара',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
  @ApiProperty({
    example: 34799,
    description: 'Цена товара',
  })
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;
  @ApiProperty({
    example: 34799,
    description: 'Итоговая цена товара',
    default: 0,
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  total_price: number;
  @ApiProperty({
    example: 4.5,
    description: 'Рейтинг товара',
    default: 0,
  })
  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  score: number;
  @ApiProperty({
    example: 1600,
    description: 'Количество оценок товара',
    default: 0,
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  count_score: number;
  @ApiProperty({
    type: SubCategory,
    description: 'Подкатегория товара',
  })
  @ApiProperty({
    type: Specification,
    description: 'Характеристики товара',
  })
  @HasOne(() => Specification, 'fk_specificationid')
  specification: Specification;
  @ApiProperty({
    type: SubCategory,
    description: 'Подкатегория товара',
  })
  @BelongsTo(() => SubCategory, 'fk_productid')
  sub_category: SubCategory;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_productid: number;
  @ApiProperty({
      type: ProductImages,
      isArray: true,
      description: 'Изображения товара'
  })
  @HasMany(() => ProductImages, 'fk_productimagesid')
  images: ProductImages[];
}
