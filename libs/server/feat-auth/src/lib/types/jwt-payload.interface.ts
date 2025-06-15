import { UserRole } from '@my-auctions/shared/types';

export interface IJwtPayload {
  sub: string;

  email: string;

  role: UserRole;

  iat: string;

  exp: number;
}
