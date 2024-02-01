import { TokenService } from './../token/token.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization']?.split(' ')[1];
    console.log(accessToken);
    try {
      const payload = await this.tokenService.decodeToken(accessToken);
      request['account_id'] = payload.account_id;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // 토큰 기간 만료 에러 처리
        throw new UnauthorizedException('Token has expired.');
      }

      if (!accessToken) {
        throw new NotFoundException('accessToken is not found');
      }

      throw new BadRequestException('Invalid token.');
    }
    return true;
  }
}
