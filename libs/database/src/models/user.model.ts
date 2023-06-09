import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Delivery } from './delivery.model';
import { Discount } from './discount.model';
import { Favorite } from './favorite.model';
import { Product } from './product.model';
import { Profile } from './profile.model';
import { Review } from './review.model';
import { Role } from './role.model';
import { UserRoles } from './user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Электронная почта пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({
    example: 'password1234',
    description: 'Пароль пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken: string;
  @ApiProperty({
    type: Role,
    isArray: true,
    description: 'Роли пользователя',
  })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
  @ApiProperty({
    type: Profile,
    description: 'Профиль пользователя',
  })
  @HasOne(() => Profile, 'fk_profileid')
  profile: Profile;
  @ApiProperty({
    type: Review,
    isArray: true,
    description: 'Отзывы пользователя',
  })
  @HasMany(() => Review, 'fk_reviewuser')
  reviews: Review[];
  @ApiProperty({
    type: Favorite,
    description: 'Избарнные товары пользователя',
  })
  @HasOne(() => Favorite, 'fk_favoriteid')
  favorite: Favorite;
  @ApiProperty({
    type: Cart,
    description: 'Корзина пользователя',
  })
  @HasOne(() => Cart, 'fk_cartid')
  cart: Cart;
  @ApiProperty({
    type: Delivery,
    description: 'Раздел доставки пользователя',
  })
  @HasOne(() => Delivery, 'fk_deliveryid')
  delivery: Delivery;
  @ApiProperty({
    type: Product,
    isArray: true,
    description: 'Товары продавца',
  })
  @HasMany(() => Product, 'fk_productuser')
  products: Product[];
  @ApiProperty({
    type: Discount,
    isArray: true,
    description: 'Скидки, которые создал данный пользователь',
  })
  @HasMany(() => Discount, 'fk_discountid')
  discounts: Discount[];
}
