import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ example: 'Видеокарты', description: 'Название подкатегории' })
  @IsString({ message: 'поле "name" - должно быть строкой' })
  name: string;
}
