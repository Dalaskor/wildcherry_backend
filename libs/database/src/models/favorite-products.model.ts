import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Favorite } from "./favorite.model";
import { Product } from "./product.model";

@Table({ tableName: 'favorite_products' })
export class FavoriteProducts extends Model<FavoriteProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Favorite)
  @Column({type: DataType.INTEGER})
  favoriteId: number;
  @ForeignKey(() => Product)
  @Column({type: DataType.INTEGER})
  productId: number;
}
