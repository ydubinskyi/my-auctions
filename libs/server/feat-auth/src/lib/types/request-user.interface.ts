import { UserRole } from '@my-auctions/shared/types';

export interface IRequestUserData {
  id: string;

  email: string;

  role: UserRole;
}
