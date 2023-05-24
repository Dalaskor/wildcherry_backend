import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiPropertyOptional({
    example: 'Джотаро',
    description: 'Имя пользователя',
    nullable: true,
  })
  @IsString({message: 'поле "name" - должно быть строкой'})
  @IsOptional()
  name?: string;
  @ApiPropertyOptional({
    example: 'Куджо',
    description: 'Фамилия пользователя',
    nullable: true,
  })
  @IsString({message: 'поле "surname" - должно быть строкой'})
  @IsOptional()
  surname?: string;
  @ApiPropertyOptional({
    example: 'мужской',
    description: 'Пол пользователя',
    nullable: true,
  })
  @IsString({message: 'поле "gender" - должно быть строкой'})
  @IsOptional()
  gender?: string;
  @ApiPropertyOptional({
    example: '88005553535',
    description: 'Номер телефона пользователя',
    nullable: true,
  })
  @IsString({message: 'поле "phone" - должно быть строкой'})
  @IsOptional()
  phone?: string;
  @ApiPropertyOptional({
    example:
      'https://i1.sndcdn.com/avatars-KHCJysyj9xSJNBhs-hTFe8g-t500x500.jpg',
    description: 'URL до изображения профиля пользователя',
    nullable: true,
  })
  @IsString({message: 'поле "profile_img_url" - должно быть строкой'})
  @IsOptional()
  profile_img_url?: string;
}
