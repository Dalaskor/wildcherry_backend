import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartProducts } from './cart-products.model';
import { Cart } from './cart.model';
import { DeliveryProducts } from './delivery-products.model';
import { Delivery } from './delivery.model';
import { DiscountProducts } from './discount-products.model';
import { Discount } from './discount.model';
import { FavoriteProducts } from './favorite-products.model';
import { Favorite } from './favorite.model';
import { ProductImages } from './product-images.model';
import { Review } from './review.model';
import { Specification } from './specification.model';
import { SubCategory } from './sub-category.model';
import { User } from './user.model';

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
    type: DataType.DOUBLE,
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
    description: 'Изображения товара',
  })
  @HasMany(() => ProductImages, 'fk_productimagesid')
  images: ProductImages[];
  @ApiProperty({
    type: Review,
    isArray: true,
    description: 'Отзывы на товар',
  })
  @HasMany(() => Review, 'fk_reviewproduct')
  reviews: Review[];
  @ApiProperty({
    type: Favorite,
    isArray: true,
    description: 'У каких пользователей этот товар находиться в избранном',
  })
  @BelongsToMany(() => Favorite, () => FavoriteProducts)
  favorites: Favorite[];
  @ApiProperty({
    type: User,
    description: 'Продавец данного товара',
  })
  @BelongsTo(() => User, 'fk_productuser')
  owner: User;
  @Column({ type: DataType.INTEGER, allowNull: true })
  fk_productuser: number;
  @ApiProperty({
    type: Discount,
    isArray: true,
    description: 'Скидки, которые действуют на данный товар',
  })
  @BelongsToMany(() => Discount, () => DiscountProducts)
  discounts: Discount[];
  @ApiProperty({
    type: Cart,
    isArray: true,
    description: 'В каких корзинах находиться данный товар',
  })
  @BelongsToMany(() => Cart, () => CartProducts)
  carts: Cart[];
  @ApiProperty({
    type: Delivery,
    isArray: true,
    description: 'В каких доставках находиться данный товар',
  })
  @BelongsToMany(() => Delivery, () => DeliveryProducts)
  deliveries: Delivery[];
}
