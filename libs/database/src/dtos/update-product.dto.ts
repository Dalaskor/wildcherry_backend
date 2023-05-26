import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

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
  //////
  @ApiPropertyOptional({
      example: 1,
      description: 'ID подкатегории товара'
  })
  @IsInt({ message: 'поле "sub_category" - должно быть целым числом' })
  sub_category?: number;
  @ApiPropertyOptional({
    example:
      ['https://c.dns-shop.ru/thumb/st4/fit/500/500/8be3e2f04d108b4f8f9bf574406655f5/7c80865de448b9054d6bd5b08dc25df8674ff369065f8a8ce2fc392625bd0ea6.jpg.webp'],
    description: 'URL адрес до изображения товара',
    isArray: true,
  })
  @IsString({
    message: 'поле "lenght" - должно быть масивом строк',
    each: true,
  })
  images?: string[];
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Длина товара',
    nullable: true,
  })
  @IsNumber({}, { message: 'поле "lenght" - должно быть числом' })
  lenght?: number;
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Ширина товара',
    nullable: true,
  })
  @IsNumber({}, { message: 'поле "width" - должно быть числом' })
  width?: number;
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Высота товара',
    nullable: true,
  })
  @IsNumber({}, { message: 'поле "height" - должно быть числом' })
  height?: number;
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Вес товара',
    nullable: true,
  })
  @IsNumber({}, { message: 'поле "weight" - должно быть числом' })
  weight?: number;
}
