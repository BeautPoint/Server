import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('Likes')
export class LikesEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  place_id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({ type: 'varchar', length: 30 })
  account_id: string;

  @Column({ type: 'timestamp' })
  addedAt: Date;
}
