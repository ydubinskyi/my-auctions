import type { Relation } from 'typeorm';
import { Column, Entity, ManyToMany } from 'typeorm';

import { AbstractOrmEntity } from './base.entity';
import { CategoryEntity } from './category.entity';

@Entity('attributes')
export class AttributeEntity extends AbstractOrmEntity {
  @Column()
  name!: string;

  @ManyToMany(() => CategoryEntity, (category) => category.attributes)
  categories!: Relation<CategoryEntity[]>;
}
