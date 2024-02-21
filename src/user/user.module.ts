import { AccountRepository } from './../repository/acccount.repository';
import { MembersRepository } from './../repository/members.repository';
import { TokenModule } from './../token/token.module';
import { AccountEntity } from './../entities/account.entity';
import { MembersEntity } from './../entities/members.entity';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembersEntity, AccountEntity]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService, MembersRepository, AccountRepository],
})
export class UserModule {}
