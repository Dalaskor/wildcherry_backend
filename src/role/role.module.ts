import { Role, UserRoles } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleController } from './role.controller';
import { RoleSerivce } from './role.service';

@Module({
    providers: [RoleSerivce],
    controllers: [RoleController],
    imports: [SequelizeModule.forFeature([Role, UserRoles])],
    exports: [RoleSerivce]
})
export class RoleModule {}
