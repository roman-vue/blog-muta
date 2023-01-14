import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { CreateUserDto } from '../users/dto/createUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async signIn({ email, password }: AuthDto) {
    const verifyEmail = await this.usersService.findByEmail(email);
    const comapare = await bcrypt.compare(password, verifyEmail.password);
    if (!comapare) {
      throw new ForbiddenException(`incorrect password`);
    }
    const accessAndRefresh = {
      id: verifyEmail.id,
      email: verifyEmail.email,
    };
    const accessToken = await this.jwtService.generateAccessToken(
      accessAndRefresh,
    );
    const refreshToken = await this.jwtService.generateRefreshToken(
      accessAndRefresh,
    );
    return { accessToken, refreshToken };
  }

  public async signUp(createUserDto: CreateUserDto) {
    const createNewUser = await this.usersService.created(createUserDto);
    return createNewUser;
  }

  public async generateRefreshToken(token: string) {
    const verify = await this.jwtService.verifyRefreshToken(token);
  }
}
