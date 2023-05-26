import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRewviewDto {
  @ApiProperty({
    example: 'Топовая видеокарта',
    description: 'Заголовок отзыва',
  })
  @IsString({ message: 'поле "description" должно быть строкой' })
  title: string;
  @ApiProperty({
    example: '2 гига 2 ядра',
    description: 'Основной текст отзыва',
  })
  @IsString({ message: 'поле "description" должно быть строкой' })
  description: string;
  @ApiProperty({
    example: '4.5',
    description: 'Оценка товару',
    minimum: 0,
    maximum: 5,
  })
  @Min(0)
  @Max(5)
  @IsNumber({}, { message: 'поле "score" должно быть числом' })
  score: number;
  @ApiProperty({
      example: 1,
      description: 'ID товара, на который написан отзыв'
  })
  @IsInt({ message: 'поле "product" должно быть целым числом' })
  product: number;
  @ApiProperty({
      example: 1,
      description: 'ID пользователя, который оставил отзыв'
  })
  @IsInt({ message: 'поле "user" должно быть целым числом' })
  user: number;
}
