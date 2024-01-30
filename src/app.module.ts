import { ormConfig } from './config/orm.config';
import { Module } from '@nestjs/common';
import { CommunityModule } from './community/community.module';
import { ShopModule } from './shop/shop.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from './token/token.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    CommunityModule,
    ShopModule,
    AuthModule,
    TypeOrmModule.forRoot(ormConfig),
    TokenModule,
    CacheModule.register({ isGlobal: true }),
    UserModule,
    CommentsModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
