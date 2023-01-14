import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-in')
  public async signIn(@Body() authDto: AuthDto) {
    const data = await this.authService;
    return data;
  }

  @Post('sign-up')
  public async signUn(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService;
    return data;
  }
}
