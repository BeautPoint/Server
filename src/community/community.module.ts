import { PostsRepository } from './../repository/posts.repository';
import { PostsEntity } from './../entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityController } from './community.controller';
import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  providers: [CommunityService, PostsRepository],
  controllers: [CommunityController],
})
export class CommunityModule {}
