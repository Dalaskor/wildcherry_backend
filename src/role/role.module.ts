import { Role, UserRoles } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RoleController } from './role.controller';
import { RoleSerivce } from './role.service';

@Module({
  providers: [RoleSerivce],
  controllers: [RoleController],
  imports: [
    SequelizeModule.forFeature([Role, UserRoles]),
    forwardRef(() => AuthModule),
  ],
  exports: [RoleSerivce],
})
export class RoleModule {}
