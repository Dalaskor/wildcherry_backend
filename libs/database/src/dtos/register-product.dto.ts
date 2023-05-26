import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class RegisterProductDto extends CreateProductDto {
  @ApiProperty({
      example: 1,
      description: 'ID подкатегории товара'
  })
  @IsInt({ message: 'поле "sub_category" - должно быть целым числом' })
  sub_category: number;
  @ApiProperty({
      example: 1,
      description: 'ID продавца, который регистрирует товар'
  })
  @IsInt({ message: 'поле "owner" - должно быть целым числом' })
  owner: number;
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
