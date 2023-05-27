import { JwtAuthGuard, JwtOutput, ROLES, Roles } from '@app/common';
import { CreateUserDto, RegistrationDto, User } from '@app/database';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Разлогинить пользователя (сбросить рефреш токен)' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiResponse({
    type: User,
    description: 'Пользователь, который разлогинился',
  })
  @UseGuards(JwtAuthGuard)
  @Get('logout/:id')
  async logout(@Param('id') id: number): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.authService.logout(id);
  }
  @ApiOperation({
    summary:
      'Обновить JWT токены пользователя (Требуется refreshToken в заголовках)',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID пользователя',
    example: 1,
  })
  @ApiHeader({ name: 'refreshtoken', example: 'asdfkljLKjasdf' })
  @ApiResponse({
    type: JwtOutput,
    status: HttpStatus.OK,
    description: 'JWT токены',
  })
  @Put('refresh/:id')
  async refreshTokens(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<JwtOutput> {
    const token: string = req.headers.refreshtoken;
    if (!Number(id) || !token) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.authService.updateTokens(id, token);
  }
}
