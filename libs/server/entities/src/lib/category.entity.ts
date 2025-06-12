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

import { Attribute } from './attribute.entity';
import { BaseEntity } from './base.entity';
import { Lot } from './lot.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  @Index()
  slug!: string;

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  parent!: Relation<Category>;

  @OneToMany(() => Category, (category) => category.parent)
  children!: Relation<Category[]>;

  @ManyToMany(() => Attribute, (attribute) => attribute.categories)
  @JoinTable()
  attributes!: Relation<Attribute[]>;

  @OneToMany(() => Lot, (lot) => lot.category)
  lots!: Relation<Lot[]>;
}
