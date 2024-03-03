import { LikesEntity } from './../entities/likes.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LikesRepository {
  constructor(
    @InjectRepository(LikesEntity)
    private readonly likesRepository: Repository<LikesEntity>,
  ) {}

  async findOneByIds(commentData: any): Promise<any> {
    const { place_id, account_id } = commentData;
    return this.likesRepository
      .createQueryBuilder()
      .select(['place_id', 'addedAt'])
      .where(`place_id = :place_id`, { place_id })
      .orWhere(`account_id = :account_id`, { account_id })
      .getRawMany();
  }

  async insertComment(commentData: any): Promise<any> {
    const column = Object.keys(commentData);

    return await this.likesRepository
      .createQueryBuilder()
      .insert()
      .into(LikesEntity, column)
      .values([commentData])
      .execute();
  }

  async deleteCommentById(data: any): Promise<any> {
    const { account_id, place_id } = data;
    return await this.likesRepository
      .createQueryBuilder()
      .delete()
      .where(`account_id = :account_id`, { account_id })
      .andWhere(`place_id = :place_id`, { place_id })
      .execute();
  }
}
