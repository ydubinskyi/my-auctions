import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    example: `some-user@example.com`,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    example: `StrongPassword123!`,
  })
  @IsString()
  password!: string;
}
