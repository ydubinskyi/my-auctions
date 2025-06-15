import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_NUMBER,
  PASSWORD_MIN_SYMBOL,
  PASSWORD_MIN_UPPERCASE,
  UserRole,
} from '@my-auctions/shared/types';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: `some-user@example.com`,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    description: `Password must contain: ${PASSWORD_MIN_LENGTH} characters, ${PASSWORD_MIN_NUMBER} number(s), ${PASSWORD_MIN_UPPERCASE} uppercase letter(s), and ${PASSWORD_MIN_SYMBOL} symbol(s)`,
    example: 'Password1!',
  })
  @IsStrongPassword(
    {
      minLength: PASSWORD_MIN_LENGTH,
      minNumbers: PASSWORD_MIN_NUMBER,
      minUppercase: PASSWORD_MIN_UPPERCASE,
      minSymbols: PASSWORD_MIN_SYMBOL,
    },
    {
      message: `Password is not strong enough. Must contain: ${PASSWORD_MIN_LENGTH} characters, ${PASSWORD_MIN_NUMBER} number(s), ${PASSWORD_MIN_UPPERCASE} uppercase letter(s), and ${PASSWORD_MIN_SYMBOL} symbol(s)`,
    }
  )
  @MaxLength(PASSWORD_MAX_LENGTH)
  password!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  firstName!: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  lastName!: string | null;

  @ApiHideProperty()
  role: UserRole = UserRole.BUYER;
}
