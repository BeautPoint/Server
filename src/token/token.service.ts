import { RefreshTokenRepository } from './../repository/refreshtoken.repository';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async createTokens(payload: object) {
    const access_token = await this.accessToken(payload);
    const refresh_token = await this.refreshToken(payload);

    return { access_token, refresh_token };
  }

  async accessToken(payload: object) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRETKEY,
      expiresIn: '1h',
    });

    return token;
  }

  async refreshToken(account_id: any) {
    const signedToken = this.jwtService.sign(
      {},
      {
        secret: process.env.SECRETKEY,
        expiresIn: '30d',
      },
    );

    const selectedToken = await this.getRefreshToken(account_id);
    const refreshTokenData = { ...account_id, token: signedToken };

    if (!selectedToken.token) {
      await this.refreshTokenRepository.insertQuery(refreshTokenData);
      return signedToken;
    }

    if (!selectedToken.expiryDate) {
      const result = await this.refreshTokenRepository.updateQuery(
        refreshTokenData,
      );
      console.log('updatedRefesh : ', result);
      return signedToken;
    }

    return selectedToken.token;
  }

  async decodeToken(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: process.env.SECRETKEY,
    });
    console.log('decode : ', payload);

    return payload;
  }

  async reissueAccessToken(data: any) {
    const { account_id, token, expiryDate } = await this.getRefreshToken({
      token: data.refreshToken,
    });

    console.log('reissueAccessToken : ', data);

    if (!token) {
      throw new Error('RefreshToken is not found');
    }

    if (expiryDate) {
      const access_token = await this.accessToken({ account_id });
      return { access_token };
    }

    const result = await this.createTokens({ account_id });

    return result;
  }

  async getRefreshToken(data) {
    const selectToken = await this.refreshTokenRepository.selectQuery(data);
    if (!selectToken) {
      return;
    }

    console.log('getrefresh :', selectToken);
    const { token, account_id } = selectToken;
    const validatedToken = await this.checkTokenExpiryDate(token);

    console.log('getRefreshCheckeDate : ', validatedToken);
    const result = { token, account_id, expiryDate: validatedToken };

    return result;
  }

  async checkTokenExpiryDate(refreshToken) {
    const daysUntilExpiry = new Date().setDate(new Date().getDate() + 7);
    const { exp } = await this.decodeToken(refreshToken);

    const validatedToken = daysUntilExpiry > exp;
    console.log('토큰 exp : ', exp);
    console.log('토큰 기간 계산 : ', refreshToken);
    console.log('토큰 기간 계산 : ', validatedToken);

    return validatedToken;
  }
}
