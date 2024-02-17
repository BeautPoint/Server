import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('Posts')
export class PostsEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  post_id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({ type: 'varchar', length: 30 })
  account_id: string;

  @Column({ type: 'varchar', length: 30, default: null })
  category_id: string;

  @Column({ type: 'varchar', length: 125 })
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  content: string;

  @Column({ type: 'int', default: null })
  views: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
