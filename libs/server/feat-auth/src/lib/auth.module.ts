import { forwardRef, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@my-auctions/server/feat-user';
import { STRATEGY_JWT_ACCESS } from '@my-auctions/server/utils-common';

import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const jwtStrategies: Provider[] = [JwtAccessStrategy, JwtRefreshStrategy];

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_ACCESS }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...jwtStrategies],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
