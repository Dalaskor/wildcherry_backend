import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Электронная почта пользователя',
  })
  @IsString({ message: 'поле "email" - должно быть строкой' })
  @IsEmail(
    {},
    { message: 'поле "email" - не совпадает с форматом электронной почты' },
  )
  email: string;
  @ApiProperty({
    example: 'password12345',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'поле "password" - должно быть строкой' })
  password: string;
}
