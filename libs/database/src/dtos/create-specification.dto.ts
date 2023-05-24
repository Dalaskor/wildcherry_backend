import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSpecificationDto {
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Длина товара',
    nullable: true,
  })
  @IsNumber({}, {message: 'поле "lenght" - должно быть числом'})
  lenght?: number;
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Ширина товара',
    nullable: true,
  })
  @IsNumber({}, {message: 'поле "width" - должно быть числом'})
  width?: number;
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Высота товара',
    nullable: true,
  })
  @IsNumber({}, {message: 'поле "height" - должно быть числом'})
  height?: number;
  @ApiPropertyOptional({
    example: 10.1,
    description: 'Вес товара',
    nullable: true,
  })
  @IsNumber({}, {message: 'поле "weight" - должно быть числом'})
  weight?: number;
}
