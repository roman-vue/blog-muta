import { Injectable } from '@nestjs/common';
import * as json from 'jsonwebtoken';
@Injectable()
export class JwtService {
  public async generateAccessToken(dataUser: Object) {
    const token = await json.sign(dataUser, 'Access', { expiresIn: '10h' });
    return token;
  }

  public async generateRefreshToken(dataUser: Object) {
    const token = await json.sign(dataUser, 'Refresh', { expiresIn: '24h' });
    return token;
  }

  public async verifyToken(token: string) {
    const verify = await json.verify(token, 'Access');
    return verify;
  }

  public async verifyRefreshToken(token: string) {
    const verify = await json.verify(token, 'Refresh');
    return verify;
  }
}
