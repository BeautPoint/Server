import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('Members')
export class MembersEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  member_id: string;

  @Column({ type: 'varchar', length: 45, default: null })
  name: string;

  @Column({ type: 'varchar', length: 15, default: null })
  phoneNumber: string;

  @Column({ type: 'char', length: 1 })
  gender: string;

  @Column({ type: 'datetime' })
  birthDate: Date;

  @Column({ type: 'char', length: 1 })
  userConsents: string;

  @Column({ type: 'char', length: 1 })
  optionalConsents: string;
}
