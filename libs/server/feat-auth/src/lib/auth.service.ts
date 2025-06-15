import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@my-auctions/server/feat-user';
import {
  compareHash,
  CreateUserDto,
  hashString,
  UserNotFoundException,
} from '@my-auctions/server/utils-common';

import { LoginUserDto } from './dtos/login-user.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { IRequestUserData } from './types/request-user.interface';

@Injectable()
export class AuthService {
  //   private logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async generateAccessToken(data: IRequestUserData) {
    const payload = {
      email: data.email,
      role: data.role,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      subject: data.id,
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  async generateRefreshToken(data: IRequestUserData) {
    const token = await this.jwtService.signAsync(
      {
        email: data.email,
        role: data.role,
      },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        subject: data.id,
        secret: process.env.JWT_ACCESS_SECRET,
      }
    );
    await this.updateUserRefreshToken(data.id, token);
    return token;
  }

  async getTokens(data: IRequestUserData) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(data),
      this.generateRefreshToken(data),
    ]);

    return new TokenResponseDto({ accessToken, refreshToken });
  }

  async validateUser(userLoginDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userLoginDto.email);

    const isPasswordValid = await compareHash(
      userLoginDto.password,
      user.password ?? ''
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async registerUser(dto: CreateUserDto): Promise<void> {
    await this.userService.createUser(dto);
  }

  async getMe(userId: string) {
    const user = await this.userService.findUser({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    if (!userId || refreshToken == '') {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUser(userId);
    const tokensMatch = await compareHash(
      refreshToken,
      user.refreshToken ?? ''
    );
    if (!tokensMatch) {
      throw new ForbiddenException(`Invalid refresh token`);
    }
    return await this.getTokens(user);
  }

  async updateUserRefreshToken(userId: string, refreshToken: string) {
    const hashed = await hashString(refreshToken);
    await this.userService.updateUser(userId, { refreshToken: hashed });
  }
}
