import { ApiProperty } from '@nestjs/swagger';

export class JwtOutput {
  @ApiProperty({
    example: 'asdjfklwkjLKJsdlkfjlkmKSADJF',
    description: 'JWT токен для доступа'
  })
  accessToken: string;
  @ApiProperty({
    example: 'asdjfklwkjLKJsdlkfjlkmKSADJF',
    description: 'JWT токен для обновления'
  })
  refreshToken: string;
}
