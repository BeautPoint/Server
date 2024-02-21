import { AccountRepository } from './../repository/acccount.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * 사용자 조회 메서드
   * - 조회하려는 사용자의 고유 id값 프론트에서 받아옵니다.
   * - 해당 계정 정보를 조회한 후, 반환합니다.
   * @param {any} account_id - 사용자 조회에 필요한 데이터
   * @returns 회원 정보 데이터
   * @Err 등록 되지 않은 계정의 대한 에러
   */
  async getProfile(account_id: string) {
    const userData = await this.accountRepository.selectQuery({ account_id });

    if (!userData) {
      throw new Error('Member not found.');
    }

    return userData;
  }

  /**
   * 사용자 수정 메서드
   * - 수정하려는 사용자의 데이터를 프론트에서 받아옵니다.
   * - 해당 계정 정보를 수정한 후, 반환합니다.
   * @param {any} profileData - 사용자 수정에 필요한 데이터
   * @returns 수정 완료한 회원 정보 데이터
   */
  async updateProfile(profileData: any) {
    const result = await this.accountRepository.updateQuery(profileData);
    return result;
  }
}
