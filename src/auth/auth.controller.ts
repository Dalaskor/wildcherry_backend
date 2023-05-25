import { JwtOutput } from '@app/common';
import { CreateUserDto, RegistrationDto } from '@app/database';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Авторизация и регистрация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Данные для логина',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JwtOutput,
  })
  @Post('login')
  async login(@Body() dto: CreateUserDto): Promise<JwtOutput> {
    return this.authService.login(dto);
  }
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({
    type: RegistrationDto,
    description: 'Данные для регистрации',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JwtOutput,
  })
  @Post('registration/user')
  async registrationUser(@Body() dto: RegistrationDto): Promise<JwtOutput> {
    return this.authService.registrationUser(dto);
  }
  @ApiOperation({
    summary: 'Регистрация продавца (также будет присвоена роль пользователя)',
  })
  @ApiBody({
    type: RegistrationDto,
    description: 'Данные для регистрации',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JwtOutput,
  })
  @Post('registration/seller')
  async registrationSeller(@Body() dto: RegistrationDto): Promise<JwtOutput> {
    return this.authService.registrationSeller(dto);
  }
  @ApiOperation({
    summary:
      'Регистрация администратора (также будет присвоена роли пользователя и продавца)',
  })
  @ApiBody({
    type: RegistrationDto,
    description: 'Данные для регистрации',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JwtOutput,
  })
  @Post('registration/admin')
  async registrationAdmin(@Body() dto: RegistrationDto): Promise<JwtOutput> {
    return this.authService.registrationAdmin(dto);
  }
}
