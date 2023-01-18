import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as json from 'jsonwebtoken';
@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}
  public async generateAccessToken(dataUser: Object) {
    const token = await json.sign(
      dataUser,
      this.configService.get('ACCESS_TOKEN'),
      { expiresIn: '10h' },
    );
    return token;
  }

  public async generateRefreshToken(dataUser: Object) {
    const token = await json.sign(
      dataUser,
      this.configService.get('REFRESH_TOKEN'),
      { expiresIn: '24h' },
    );
    return token;
  }

  public async verifyToken(token: string) {
    const verify = await json.verify(
      token,
      this.configService.get('ACCESS_TOKEN'),
    );
    return verify;
  }

  public async verifyRefreshToken(token: string) {
    const verify = await json.verify(
      token,
      this.configService.get('REFRESH_TOKEN'),
    );
    return verify;
  }
}
