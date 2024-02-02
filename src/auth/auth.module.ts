import { RefreshTokensEntity } from './../entities/refreshToken.entity';
import { RefreshTokenRepository } from './../repository/refreshtoken.repository';
import { AccountEntity } from './../entities/account.entity';
import { AccountRepository } from './../repository/acccount.repository';
import { MembersRepository } from './../repository/members.repository';
import { AuthService } from './auth.service';
import { MembersEntity } from './../entities/members.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MembersEntity,
      AccountEntity,
      RefreshTokensEntity,
    ]),
  ],
  providers: [
    AuthService,
    MembersRepository,
    AccountRepository,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
