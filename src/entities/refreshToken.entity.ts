import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('RefreshTokens')
export class RefreshTokensEntity {
  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  acount: AccountEntity;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  account_id: string;

  @Column({ type: 'varchar', length: 125 })
  token: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
