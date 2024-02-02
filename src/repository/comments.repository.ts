import { CommentsEntity } from './../entities/comments.entity';
import { RandomNumber } from './../util/randomNumber';
import { PostsEntity } from './../entities/posts.entity';
import { CheckTokenExpiryDate } from './../util/checkTokenDate';
import { RefreshTokensEntity } from './../entities/refreshToken.entity';
import { RandomString } from './../util/randomString';
import { MembersEntity } from './../entities/members.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateCustomId } from 'src/util/customIdGenerartor';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
  ) {}

  async findOneByIds(commentData: any): Promise<any> {
    const { post_id, account_id, comment_id } = commentData;
    return this.commentsRepository
      .createQueryBuilder()
      .select(['comment_id', 'post_id', 'content', 'createdAt'])
      .where(`post_id = :post_id`, { post_id })
      .orWhere(`account_id = :account_id`, { account_id })
      .orWhere(`comment_id = :comment_id`, { comment_id })
      .getRawOne();
  }

  async insertComment(commentData: any): Promise<any> {
    console.log(commentData);
    const column = Object.keys(commentData);

    return await this.commentsRepository
      .createQueryBuilder()
      .insert()
      .into(CommentsEntity, column)
      .values([commentData])
      .execute();
  }

  async updateCommentById(data: any): Promise<any> {
    const { post_id, comment_id, body } = data;
    return await this.commentsRepository
      .createQueryBuilder()
      .update()
      .set(body)
      .where(`comment_id = :comment_id`, { comment_id })
      .andWhere(`post_id = :post_id`, { post_id })
      .execute();

    await this.findOneByIds({ post_id });
  }

  async deleteCommentById(data: any): Promise<any> {
    const { account_id, comment_id } = data;
    return await this.commentsRepository
      .createQueryBuilder()
      .delete()
      .where(`account_id = :account_id`, { account_id })
      .andWhere(`comment_id = :comment_id`, { comment_id })
      .execute();
  }
}
