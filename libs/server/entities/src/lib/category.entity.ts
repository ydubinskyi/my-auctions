import type { Relation } from 'typeorm';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AttributeEntity } from './attribute.entity';
import { AbstractOrmEntity } from './base.entity';
import { LotEntity } from './lot.entity';

@Entity('categories')
export class CategoryEntity extends AbstractOrmEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  @Index()
  slug!: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    nullable: true,
  })
  parent!: Relation<CategoryEntity>;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children!: Relation<CategoryEntity[]>;

  @ManyToMany(() => AttributeEntity, (attribute) => attribute.categories)
  @JoinTable()
  attributes!: Relation<AttributeEntity[]>;

  @OneToMany(() => LotEntity, (lot) => lot.category)
  lots!: Relation<LotEntity[]>;
}
