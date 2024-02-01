import { RefreshTokenRepository } from './../repository/refreshtoken.repository';
import { TokenService } from './../token/token.service';
import { MembersRepository } from './../repository/members.repository';
import { RandomString } from './../util/randomString';
import { AccountRepository } from './../repository/acccount.repository';
import { Header, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly memberRepository: MembersRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenService: TokenService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * 새로운 사용자 생성 메서드
   * - Oauth에서 캐싱한 프로필 정보와 프론트에서 사용자 데이터를 받아옵니다.
   * - 프로필 정보를 바탕으로 계정 정보를 생성한 후, 해당 계정에 대한 토큰을 발급합니다.
   * @param {any} userData - 사용자 생성에 필요한 데이터
   * @returns 발급된 토큰 정보
   */
  async createUser(userData) {
    const oauthUserData: any = await this.cacheManager.get('oauthProfile');

    if (!oauthUserData) {
      throw new Error('Session has expired. Please try again!');
    }
    // const member_id = RandomString();

    const insertedMember = await this.memberRepository.insertQuery(userData);
    const { member_id } = insertedMember.identifiers[0];

    if (member_id) {
      const insertedAccount = await this.accountRepository.insertQuery({
        member_id,
        ...oauthUserData,
      });

      const account_id = insertedAccount.identifiers[0];
      return await this.tokenService.createTokens(account_id);
    }
  }

  /**
   * 사용자 로그인 처리 메서드
   * - OAuth 사용자 데이터를 기반으로 계정을 조회하고,
   * - 계정이 존재하면 해당 계정에 대한 토큰을 새로 발급합니다.
   * - 존재하지 않는 경우 회원가입 메서드로 보냅니다.
   * @param {any} oauthUserData - OAuth를 통해 얻은 사용자 데이터
   * @returns 발급된 토큰 정보 또는
   * @Err 등록되지 않은 계정에 대한 에러
   */
  async login(oauthUserData) {
    const { account_id } = await this.accountRepository.selectQuery(
      oauthUserData,
    );

    console.log('login : ', account_id);

    if (account_id) {
      const result = await this.tokenService.createTokens({ account_id });
      console.log('로그인 에서 발급한 토큰 : ', result);

      return result;
    }

    throw new Error('Not registered');
  }

  async logout(data) {
    const { refresh_token } = data;
    await this.tokenService.getRefreshToken(refresh_token);
  }

  /**
   * 외부 OAuth 서비스를 통한 인증 메서드
   * - 인증 타입과 소셜 액세스 토큰을 바탕으로 외부 서비스로부터 사용자 프로필을 조회합니다.
   * - 받아오 프로필을 10분간 캐싱한 뒤 로그인 메서드로 보냅니다.
   * @param {any} data - OAuth 타입과 해당 소셜의 액세스 토큰 정보
   * @returns 로그인 처리 결과
   */
  async Oauth(data: any) {
    const { type, accessToken } = data;
    const oauthUserData = type === 'kakao' ? await this.kakao(accessToken) : '';
    const result = await this.login(oauthUserData);

    await this.cacheManager.set('oauthProfile', oauthUserData, 1000 * 600);

    return result;
  }

  /**
   * 카카오 OAuth 서비스를 통해 사용자 프로필 정보를 조회합니다.
   * @param {string} accessToken - 카카오 액세스 토큰
   * @returns 조회된 사용자 프로필 정보
   */
  async kakao(accessToken) {
    try {
      console.log(accessToken);
      const profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { id } = profile.data;
      const { nickname: nickName, profile_image } = profile.data.properties;
      const { email } = profile.data.kakao_account;
      const result = {
        social_id: id,
        socialType: 'kakao',
        email,
        nickName,
        profile_image,
      };
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 네이버 OAuth 서비스를 통해 사용자 프로필 정보를 조회합니다.
   * @param {string} accessToken - 네이버 액세스 토큰
   * @returns 조회된 사용자 프로필 정보
   */
  async naver() {}

  /**
   * 구글 OAuth 서비스를 통해 사용자 프로필 정보를 조회합니다.
   * @param {string} accessToken - 구글 액세스 토큰
   * @returns 조회된 사용자 프로필 정보
   */
  async google() {}

  async apple() {}
}
