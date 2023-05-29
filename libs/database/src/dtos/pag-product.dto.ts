import { PRODUCT_ORDER_BY } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PagOptionsDto } from './pag-options.dto';

export class PagProductDto extends PagOptionsDto {
  @ApiPropertyOptional({
    enum: PRODUCT_ORDER_BY,
    default: PRODUCT_ORDER_BY.SCORE,
    description: 'Поле для сортировки',
  })
  @IsEnum(PRODUCT_ORDER_BY)
  @IsOptional()
  readonly orderBy?: PRODUCT_ORDER_BY = PRODUCT_ORDER_BY.SCORE;
  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
    description: 'Фильтр по цене (начиная с)',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly priceStart?: number = 0;
  @ApiPropertyOptional({
    minimum: 0.1,
    description: 'Фильтр по цене (до)',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  @IsOptional()
  readonly priceEnd?: number = 0;
  @ApiPropertyOptional({
    minimum: 0,
    maximum: 4.9,
    default: 0,
    description: 'Фильтр по рейтингу (начиная с)',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(4.9)
  @IsOptional()
  readonly scoreStart?: number = 0;
  @ApiPropertyOptional({
    minimum: 0.1,
    maximum: 5,
    default: 5,
    description: 'Фильтр по рейтингу (до)',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  @Max(5)
  @IsOptional()
  readonly scoreEnd?: number = 0;
  @ApiPropertyOptional({
    example: 'видеокарта',
    description: 'Строка поиска',
  })
  @IsString({ message: 'поле "search" - должно быть строкой' })
  @IsOptional()
  readonly search?: string = '';
}
