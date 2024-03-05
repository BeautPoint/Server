import { CheckTokenExpiryDate } from './../util/checkTokenDate';
import { RefreshTokensEntity } from './../entities/refreshToken.entity';
import { RandomString } from './../util/randomString';
import { MembersEntity } from './../entities/members.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokensEntity)
    private readonly refreshTokensRepository: Repository<RefreshTokensEntity>,
  ) {}

  async selectQuery(data: any): Promise<any> {
    const { token, account_id } = data;

    console.log('selectQuery : ', data);
    // return 'BT';
    return await this.refreshTokensRepository
      .createQueryBuilder()
      .select(['account_id', 'token'])
      .where(`token = :token`, { token })
      .orWhere(`account_id = :account_id`, { account_id })
      .getRawOne();
  }

  async insertQuery(data: any): Promise<any> {
    console.log('insertQuery : ', data);
    const column = Object.keys(data);

    // return 'Insert';
    return await this.refreshTokensRepository
      .createQueryBuilder()
      .insert()
      .into(RefreshTokensEntity, column)
      .values([data])
      .execute();
  }

  async updateQuery(data: any): Promise<any> {
    const { account_id, token } = data;
    console.log('updateqQuery : ', data);

    return this.refreshTokensRepository
      .createQueryBuilder()
      .update()
      .set({ token })
      .where(`account_id = :account_id`, { account_id })
      .execute();
  }

  async deleteQuery(data: any): Promise<any> {
    const { account_id } = data;

    console.log('deletedQuery : ', data);

    return 'AA';

    await this.refreshTokensRepository
      .createQueryBuilder()
      .where(`account_id = :account_id`, { account_id })
      .getRawOne();

    return await this.insertQuery(data);
  }
}
