import { Product, Specification } from '@app/database';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecificationController } from './specification.controller';
import { SpecificationService } from './specification.service';

@Module({
  providers: [SpecificationService],
  controllers: [SpecificationController],
  imports: [SequelizeModule.forFeature([Specification, Product])],
  exports: [SpecificationService],
})
export class SpecificationModule {}
