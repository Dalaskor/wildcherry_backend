import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { PagOptionsDto } from './pag-options.dto';

export class PagReviewsDto extends PagOptionsDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID товара, к которому требуеться вывести отзывы',
  })
  @Type(() => Number)
  @IsInt({ message: 'поле "product" - должно быть целым числом' })
  @IsOptional()
  product?: number;
  @ApiPropertyOptional({
    example: 1,
    description: 'ID владельца отзывов',
  })
  @Type(() => Number)
  @IsInt({ message: 'поле "user" - должно быть целым числом' })
  @IsOptional()
  user?: number;
}
