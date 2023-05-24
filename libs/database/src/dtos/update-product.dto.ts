import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Видеокарта Palit GeForce RTX 3060 Dual OC (LHR)',
    description: 'Название товара',
  })
  @IsString({ message: 'поле "name" - должно быть строкой' })
  @IsOptional()
  name?: string;
  @ApiPropertyOptional({
    example:
      'Видеокарта Palit GeForce RTX 3060 DUAL OC (LHR) [NE63060T19K9-190AD] представляет собой высокопроизводительное решение для профессиональных рабочих станций и игровых систем.',
    description: 'Описание товара',
  })
  @IsString({ message: 'поле "description" - должно быть строкой' })
  @IsOptional()
  description?: string;
  @ApiPropertyOptional({
    example: 34799,
    description: 'Цена товара',
  })
  @IsNumber({}, { message: 'поле "price" - должно быть числом' })
  @IsOptional()
  price?: number;
}
