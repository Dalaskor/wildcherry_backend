import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SubCategory } from './sub-category.model';

interface CategoryCreationAttrs {
  name: string;
}
@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID категории' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'Компьютерные комплектующие',
    description: 'Название категории',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;
  @ApiProperty({
    type: SubCategory,
    isArray: true,
    description: 'Подкатегории',
  })
  @HasMany(() => SubCategory, 'fk_subcategoryid')
  sub_categories: SubCategory[];
}
