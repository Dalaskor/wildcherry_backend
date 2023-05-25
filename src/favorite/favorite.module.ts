import { Favorite, FavoriteProducts, Product, User } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  providers: [FavoriteService],
  controllers: [FavoriteController],
  imports: [
    SequelizeModule.forFeature([Favorite, User, Product, FavoriteProducts]),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
