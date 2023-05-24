import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Компьютерные комплектующие',
    description: 'Название категории',
  })
  @IsString({ message: 'поле "name" - должно быть строкой' })
  name: string;
}
