import { ROLES } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PagOptionsDto } from './pag-options.dto';

export class PagUsersDto extends PagOptionsDto {
  @ApiPropertyOptional({
    enum: ROLES,
    description: 'Фильтрация по роли пользователя',
  })
  @IsEnum(ROLES)
  @IsOptional()
  readonly role?: ROLES;
}
