import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { User } from './user.model';

interface ReviewCreationAttrs {
  title: string;
  decription: string;
  rating: number;
}
@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID отзыва' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'Топовая видеокарта',
    description: 'Заголовок отзыва',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @ApiProperty({
    example: '2 гига 2 ядра',
    description: 'Основной текст отзыва',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;
  @ApiProperty({
    example: '4.5',
    description: 'Оценка товару',
  })
  @Column({ type: DataType.DOUBLE, allowNull: false })
  score: number;
  @ApiProperty({
    type: Product,
    description: 'Товар, на который написан отзыв',
  })
  @BelongsTo(() => Product, 'fk_reviewproduct')
  product: Product;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_reviewproduct: number;
  @ApiProperty({
    type: User,
    description: 'Пользователь, который оставил отзыв',
  })
  @BelongsTo(() => User, 'fk_reviewuser')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_reviewuser: number;
}
