import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Видеокарта Palit GeForce RTX 3060 Dual OC (LHR)',
    description: 'Название товара',
  })
  @IsString({ message: 'поле "name" - должно быть строкой' })
  name: string;
  @ApiProperty({
    example:
      'Видеокарта Palit GeForce RTX 3060 DUAL OC (LHR) [NE63060T19K9-190AD] представляет собой высокопроизводительное решение для профессиональных рабочих станций и игровых систем.',
    description: 'Описание товара',
  })
  @IsString({ message: 'поле "description" - должно быть строкой' })
  description: string;
  @ApiProperty({
    example: 34799,
    description: 'Цена товара',
  })
  @IsNumber({}, { message: 'поле "price" - должно быть числом' })
  price: number;
}
