import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { MembersEntity } from './members.entity';

@Entity('Account')
export class AccountEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  account_id: string;

  /**
   * ManyToOne 또는 OneToOne 관계 정의
   * 외래키 컬럼명 명시
   * member_id 대신 사용할 엔티티 프로퍼티
   */

  @ManyToOne(() => MembersEntity)
  @JoinColumn({ name: 'member_id' })
  member: MembersEntity;

  @Column({ type: 'varchar', length: 30 })
  member_id: string;

  @Column({ type: 'varchar', length: 30 })
  social_id: string;

  @Column({ type: 'varchar', length: 10 })
  socialType: string;

  @Column({ type: 'varchar', length: 35 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  nickName: string;

  @Column({ type: 'varchar', length: 255, default: null })
  profile_image: string | null;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @Column({ type: 'datetime', precision: 6, default: null })
  deletedAt: Date;
}
