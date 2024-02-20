import { RefreshTokenRepository } from './../repository/refreshtoken.repository';
import { RefreshTokensEntity } from './../entities/refreshToken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokensEntity]),
    JwtModule.register({ secret: process.env.SECRETKEY }),
  ],
  providers: [TokenService, JwtService, RefreshTokenRepository],
  exports: [TokenService],
  controllers: [],
})
export class TokenModule {}
