import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    example: 'password12345',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'поле "password" - должно быть строкой' })
  password: string;
}
