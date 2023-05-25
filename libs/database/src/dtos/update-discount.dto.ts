import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateDiscountDto {
  @ApiPropertyOptional({
    example: 'Купи видеокарту',
    description: 'Заголовок акции',
  })
  @IsString({ message: 'поле "title" - должно быть строкой' })
  @IsOptional()
  title?: string;
  @ApiPropertyOptional({
    example: 'Вторую не получишь',
    description: 'Описание акции',
  })
  @IsString({ message: 'поле "description" - должно быть строкой' })
  @IsOptional()
  description?: string;
  @ApiPropertyOptional({
    example: 50,
    description: 'Размер скидки',
    minimum: 0,
    maximum: 100,
  })
  @Min(0)
  @Max(100)
  @IsInt({ message: 'поле "value" - должно быть целым числом' })
  @IsOptional()
  value?: number;
}
