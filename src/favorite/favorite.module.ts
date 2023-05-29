import { Favorite, FavoriteProducts, Product, User } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  providers: [FavoriteService],
  controllers: [FavoriteController],
  imports: [
    SequelizeModule.forFeature([Favorite, User, Product, FavoriteProducts]),
    ProductModule,
    AbilityModule,
    forwardRef(() => AuthModule),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
