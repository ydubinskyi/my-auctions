import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '@my-auctions/shared/types';
import { UserEntity } from '@my-auctions/server/entities';

import { AbstractDto } from '../base.dto';

export class UserDto extends AbstractDto {
  @ApiProperty()
  email!: string;

  @ApiProperty({ type: String })
  firstName!: string | null;

  @ApiProperty({ type: String })
  lastName!: string | null;

  @ApiProperty({ type: String })
  fullName!: string | null;

  @ApiProperty({ enum: UserRole })
  role!: UserRole;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.fullName = user.fullName;
    this.role = user.role;
  }
}
