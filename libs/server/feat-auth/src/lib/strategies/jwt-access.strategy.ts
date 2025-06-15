import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@my-auctions/server/feat-user';
import { STRATEGY_JWT_ACCESS } from '@my-auctions/server/utils-common';

import { IJwtPayload } from '../types/jwt-payload.interface';
import { IRequestUserData } from '../types/request-user.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_JWT_ACCESS
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET as string,
    });
  }

  /**
   * Method used by Passport - `payload` is the body of the (already
   * validated) JWT in the request. Any returned data is appended to the
   * request to assemble a `user` property.
   *
   */
  async validate(payload: IJwtPayload): Promise<IRequestUserData> {
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
    };
  }
}
