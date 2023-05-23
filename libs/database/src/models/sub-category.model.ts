import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { Product } from './product.model';

interface SubCategoryCreationAttrs {
  name: string;
}
@Table({ tableName: 'sub_categories' })
export class SubCategory extends Model<SubCategory, SubCategoryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID подкатегории' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Видеокарты', description: 'Название подкатегории' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;
  @ApiProperty({ type: Category, description: 'Категория' })
  @BelongsTo(() => Category, 'fk_subcategoryid')
  category: Category;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_subcategoryid: number;
  @ApiProperty({
      type: Product,
      isArray: true,
      description: 'Товары данной подкатегории'
  })
  @HasMany(() => Product, 'fk_productid')
  products: Product[];
}
