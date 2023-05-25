import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({ example: 'Купи видеокарту', description: 'Заголовок акции' })
  @IsString({ message: 'поле "title" - должно быть строкой' })
  title: string;
  @ApiProperty({ example: 'Вторую не получишь', description: 'Описание акции' })
  @IsString({ message: 'поле "description" - должно быть строкой' })
  description: string;
  @ApiProperty({
    example: 50,
    description: 'Размер скидки',
    minimum: 0,
    maximum: 100,
  })
  @Min(0)
  @Max(100)
  @IsInt({ message: 'поле "value" - должно быть целым числом' })
  value: number;
}
