import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'user' })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ default: 'user@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
