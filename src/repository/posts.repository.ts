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
export class PostsRepository {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async findAllPosts(): Promise<any> {
    return await this.postsRepository
      .createQueryBuilder()
      .select([
        'post_id',
        'category_id',
        'title',
        'content',
        'views',
        'createdAt',
      ])
      .getRawMany();
  }

  async findOneByIds(data: any): Promise<any> {
    const { post_id, account_id } = data;
    return this.postsRepository
      .createQueryBuilder()
      .select([
        'post_id',
        'category_id',
        'title',
        'content',
        'views',
        'createdAt',
      ])
      .where(`post_id = :post_id`, { post_id })
      .orWhere(`account_id = :account_id`, { account_id })
      .getRawOne();
  }

  async insertPost(postData: any): Promise<any> {
    const column = Object.keys(postData);

    return await this.postsRepository
      .createQueryBuilder()
      .insert()
      .into(PostsEntity, column)
      .values([postData])
      .execute();
  }

  async updatePostById(data: any): Promise<any> {
    const { post_id, account_id, body } = data;
    return await this.postsRepository
      .createQueryBuilder()
      .update()
      .set(body)
      .where(`post_id = :post_id`, { post_id })
      .andWhere(`account_id = account_id`, { account_id })
      .execute();

    await this.findOneByIds({ post_id });
  }

  async deletePostById(data: any): Promise<any> {
    const { post_id, account_id } = data;
    return await this.postsRepository
      .createQueryBuilder()
      .delete()
      .where(`post_id = :post_id`, { post_id })
      .andWhere(`account_id = account_id`, { account_id })
      .execute();
  }
}
