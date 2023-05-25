import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional({
    example: 'Топовая видеокарта',
    description: 'Заголовок отзыва',
  })
  @IsString({ message: 'поле "description" должно быть строкой' })
  @IsOptional()
  title?: string;
  @ApiPropertyOptional({
    example: '2 гига 2 ядра',
    description: 'Основной текст отзыва',
  })
  @IsString({ message: 'поле "description" должно быть строкой' })
  @IsOptional()
  description?: string;
  @ApiPropertyOptional({
    example: '4.5',
    description: 'Оценка товару',
    minimum: 0,
    maximum: 5,
  })
  @Min(0)
  @Max(5)
  @IsNumber({}, { message: 'поле "score" должно быть числом' })
  @IsOptional()
  score?: number;
}
