import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@my-auctions/server/feat-user';
import { STRATEGY_JWT_REFRESH } from '@my-auctions/server/utils-common';

import { IJwtPayload } from '../types/jwt-payload.interface';
import { IRequestUserData } from '../types/request-user.interface';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_JWT_REFRESH
) {
  private logger = new Logger(JwtRefreshStrategy.name);
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET as string,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: IJwtPayload
  ): Promise<IRequestUserData & { refreshToken: string }> {
    const refreshToken =
      req.get('Authorization')?.replace('Bearer', '').trim() ?? '';
    this.logger.debug(
      `Validating refresh token for ${payload.email}\n${refreshToken}`
    );
    const user = await this.userService.findUser({
      id: payload.sub,
      role: payload.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      refreshToken,
    };
  }
}
