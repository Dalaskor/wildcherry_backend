import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    example: 'SELLER',
    description: 'Название роли',
  })
  @IsString({ message: 'поле "value" - должно быть строкой' })
  @IsOptional()
  value?: string;
  @ApiPropertyOptional({
    example: 'Барыга',
    description: 'Описание роли',
  })
  @IsString({ message: 'поле "description" - должно быть строкой' })
  @IsOptional()
  description?: string;
}
