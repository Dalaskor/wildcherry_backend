import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { PagOptionsDto } from './pag-options.dto';

export class PagDiscountDto extends PagOptionsDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID товара, к которому требуеться вывести акции',
  })
  @Type(() => Number)
  @IsInt({ message: 'поле "product" - должно быть целым числом' })
  @IsOptional()
  product?: number;
  @ApiPropertyOptional({
    example: 1,
    description: 'ID владельца акций',
  })
  @Type(() => Number)
  @IsInt({ message: 'поле "user" - должно быть целым числом' })
  @IsOptional()
  user?: number;
}
