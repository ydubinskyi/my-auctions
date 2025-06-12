import type { Relation } from 'typeorm';
import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity('attributes')
export class Attribute extends BaseEntity {
  @Column()
  name!: string;

  @ManyToMany(() => Category, (category) => category.attributes)
  categories!: Relation<Category[]>;
}
