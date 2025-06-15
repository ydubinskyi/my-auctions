import type { Relation } from 'typeorm';
import { Column, Entity, Index, OneToMany, VirtualColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRole } from '@my-auctions/shared/types';

import { AuctionEntity } from './auction.entity';
import { AbstractOrmEntity } from './base.entity';
import { BidEntity } from './bid.entity';

@Entity('users')
export class UserEntity extends AbstractOrmEntity {
  @Column({ nullable: true, type: String })
  firstName!: string | null;

  @Column({ nullable: true, type: String })
  lastName!: string | null;

  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}."firstName", ' ', ${alias}."lastName")`,
  })
  fullName!: string;

  @Column({ unique: true })
  @Index('user_email_index')
  email!: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: {
      to: (value: string) => {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(value, salt);
      },
      from: (value: string) => value,
    },
  })
  password!: string;

  @Column({ nullable: true, type: String })
  refreshToken!: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BUYER,
  })
  role!: UserRole;

  @OneToMany(() => AuctionEntity, (auction) => auction.seller)
  auctions!: Relation<AuctionEntity[]>;

  @OneToMany(() => BidEntity, (bid) => bid.user)
  bids!: Relation<BidEntity[]>;
}
