import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UserAddRoleDto {
  @ApiProperty({
    example: 1,
    description: 'ID пользователя',
  })
  @IsInt({ message: 'поле "user_id" - должно быть целым числом' })
  user_id: number;
  @ApiProperty({
    example: 1,
    description: 'ID роли',
  })
  @IsInt({ message: 'поле "value_id" - должно быть целым числом' })
  role_id: number;
}
