import { RandomString } from './../util/randomString';
import { RandomNumber } from './../util/randomNumber';
import { AccountEntity } from './../entities/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  /**
   * selecet : 조회하고자 하는 컬럼을 지정하는데, 값을 주지 않을 경우 모든 컬럼이 조회된다, 값을 주지 않은 경우 key에 별칭이 붙어서 조회된다.
   *
   */

  async selectQuery(user_data: any): Promise<any> {
    // const { social_id, email } = mokdata;
    const { social_id, email, account_id } = await user_data;
    return this.accountRepository
      .createQueryBuilder()
      .select([
        'account_id',
        'social_id',
        'socialType',
        'nickName',
        'profile_image',
        'createdAt',
      ])
      .where(`social_id = :social_id AND email = :email`, { social_id, email })
      .orWhere(`account_id = :account_id`, { account_id })
      .getRawOne();
  }

  async insertQuery(data: any): Promise<any> {
    const account_id = RandomNumber();
    const valuesData = { account_id, ...data };
    const column = Object.keys(valuesData);

    console.log('받은 데이터 : ', valuesData);

    return await this.accountRepository
      .createQueryBuilder()
      .insert()
      .into(AccountEntity, column)
      .values([valuesData])
      .execute();
  }

  async updateQuery(profileData: any): Promise<any> {
    const { account_id, body } = profileData;
    await this.accountRepository
      .createQueryBuilder()
      .update()
      .set(body)
      .where(`account_id = :account_id`, { account_id })
      .execute();

    return await this.selectQuery({ account_id });
  }

  async deleteQuery(user_id: string): Promise<any> {
    return this.accountRepository
      .createQueryBuilder()
      .where(`user_id = :user_id`, { user_id })
      .getRawOne();
  }
}
