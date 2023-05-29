import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ManageCartDto {
  @ApiProperty({
    example: 1,
    description: 'ID пользователя',
  })
  @IsInt({message: 'поле "user_id" - должно быть целым числом'})
  user_id: number;
  @ApiProperty({
    example: 1,
    description: 'ID товара',
  })
  @IsInt({message: 'поле "product_id" - должно быть целым числом'})
  product_id: number;
  @ApiProperty({
    example: 1,
    description: 'Количество товара',
  })
  @IsInt({message: 'поле "count" - должно быть целым числом'})
  count: number;
}
