import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ default: 'user' })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ default: 'user@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
