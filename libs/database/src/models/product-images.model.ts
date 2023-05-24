import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';

interface ProductImagesCreationAttrs {
  url: string;
}
@Table({ tableName: 'product_images' })
export class ProductImages extends Model<
  ProductImages,
  ProductImagesCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID изображения товара' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example:
      'https://c.dns-shop.ru/thumb/st4/fit/500/500/8be3e2f04d108b4f8f9bf574406655f5/7c80865de448b9054d6bd5b08dc25df8674ff369065f8a8ce2fc392625bd0ea6.jpg.webp',
    description: 'URL адрес до изображения товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;
  @ApiProperty({
    type: Product,
    description: 'Товар на данном изображении',
  })
  @BelongsTo(() => Product, 'fk_productimagesid')
  product: Product;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_productimagesid: number;
}
