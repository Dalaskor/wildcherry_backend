import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'SELLER',
    description: 'Название роли',
  })
  @IsString({ message: 'поле "value" - должно быть строкой' })
  value: string;
  @ApiProperty({
    example: 'Барыга',
    description: 'Описание роли',
  })
  @IsString({ message: 'поле "description" - должно быть строкой' })
  description: string;
}
