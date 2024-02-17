import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { PostsEntity } from './posts.entity';

@Entity('Comments')
export class CommentsEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  comment_id: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({ type: 'varchar', length: 30 })
  account_id: string;

  @ManyToOne(() => PostsEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostsEntity;

  @Column({ type: 'varchar', length: 30 })
  post_id: string;

  @Column({ type: 'varchar', length: 30, default: null })
  parent_id: string;

  @Column({ type: 'varchar', length: 300 })
  content: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
