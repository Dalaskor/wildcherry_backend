import {
  Cart,
  Delivery,
  Discount,
  Favorite,
  Product,
  Profile,
  Review,
  Role,
  User,
  UserRoles,
} from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Cart,
      Favorite,
      Delivery,
      Discount,
      Product,
      Profile,
      Review,
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
