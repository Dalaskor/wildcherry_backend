import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductImagesDto {
  @ApiProperty({
    example:
      'https://c.dns-shop.ru/thumb/st4/fit/500/500/8be3e2f04d108b4f8f9bf574406655f5/7c80865de448b9054d6bd5b08dc25df8674ff369065f8a8ce2fc392625bd0ea6.jpg.webp',
    description: 'URL адрес до изображения товара',
  })
  @IsString({ message: 'поле "url" - должно быть строкой' })
  url: string;
}
