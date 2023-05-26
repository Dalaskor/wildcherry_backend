import { AbilityFactory } from '@app/common';
import { Module } from '@nestjs/common';
import { AbilityService } from './ability.service';

@Module({
  providers: [AbilityFactory, AbilityService],
  exports: [AbilityFactory, AbilityService],
})
export class AbilityModule {}
