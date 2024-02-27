import { LikesRepository } from './../repository/likes.repository';
import { LikesEntity } from './../entities/likes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity])],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
