import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateSubCategoryDto } from './create-sub-category.dto';

export class RegisterSubCategoryDto extends CreateSubCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'ID родительской категории',
  })
  @IsInt({ message: 'поле "category" - должно быть целым числом' })
  category: number;
}
