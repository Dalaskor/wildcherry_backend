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
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
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
    forwardRef(() => AuthModule),
    RoleModule,
    AbilityModule,
  ],
  exports: [UserService],
})
export class UserModule {}
