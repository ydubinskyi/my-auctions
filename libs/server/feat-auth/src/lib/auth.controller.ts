import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';

import { UserRole } from '@my-auctions/shared/types';
import {
  Auth,
  CreateUserDto,
  JwtRefreshTokenGuard,
  ReqUserId,
  UserDto,
} from '@my-auctions/server/utils-common';

import { LoginUserDto } from './dtos/login-user.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { IRequestUserData } from './types/request-user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenResponseDto,
  })
  async emailLogin(@Body() dto: LoginUserDto) {
    const user = await this.authService.validateUser({
      email: dto.email,
      password: dto.password,
    });
    return this.authService.getTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  @Post('email/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnprocessableEntityResponse()
  async register(@Body() dto: CreateUserDto): Promise<void> {
    return this.authService.registerUser(dto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([UserRole.BUYER, UserRole.ADMIN, UserRole.SELLER])
  @ApiOkResponse({ type: UserDto })
  async getCurrentUser(@ReqUserId() userId: string): Promise<UserDto> {
    Logger.debug(`Looking up user with ID: ${userId}`);
    return this.authService.getMe(userId);
  }

  @Get('refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  async refresh(@Req() req: Request): Promise<TokenResponseDto> {
    const user = req.user as IRequestUserData & { refreshToken: string };
    this.logger.debug(`Refreshing token for ${user.email}`);
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }
}
