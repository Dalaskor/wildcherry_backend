import { ORDER } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PagOptionsDto {
  @ApiPropertyOptional({
    enum: ORDER,
    default: ORDER.ASC,
    description: 'Параметр сортировки',
  })
  @IsEnum(ORDER)
  @IsOptional()
  readonly order?: ORDER = ORDER.ASC;
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: 'Номер страницы',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Количество объектов на 1 страницу',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 50;
  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
