import { RandomString } from './../util/randomString';
import { MembersEntity } from './../entities/members.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembersRepository {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly membersRepository: Repository<MembersEntity>,
  ) {}

  async selectQuery(user_data: any): Promise<any> {
    const { social_id, email } = user_data;

    return this.membersRepository
      .createQueryBuilder()
      .select(['social_id'])
      .where(`email = :email`, { email })
      .getRawOne();
  }

  async insertQuery(data: any): Promise<any> {
    const member_id = RandomString();
    // const valuesData = { ...data, member_id };
    // const valuesData = {
    //   member_id,
    //   gender: 'M',
    //   birthDate: new Date(),
    //   userConsents: 'Y',
    //   optionalConsents: 'N',
    // };
    // console.log(valuesData);
    const userData = { member_id, ...data };
    console.log('DB : ', userData);
    const column = Object.keys(userData);

    return await this.membersRepository
      .createQueryBuilder()
      .insert()
      .into(MembersEntity, column)
      .values([userData])
      .execute();
  }

  async updateQuery(member_id: string): Promise<any> {
    return this.membersRepository
      .createQueryBuilder()
      .where(`member_id = :member_id`, { member_id })
      .getRawOne();
  }

  async deleteQuery(member_id: string): Promise<any> {
    return this.membersRepository
      .createQueryBuilder()
      .where(`member_id = :member_id`, { member_id })
      .getRawOne();
  }
}
