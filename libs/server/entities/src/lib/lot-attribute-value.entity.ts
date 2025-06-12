import type { Relation } from 'typeorm';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Attribute } from './attribute.entity';
import { BaseEntity } from './base.entity';
import { Lot } from './lot.entity';

@Entity('lot_attribute_values')
export class LotAttributeValue extends BaseEntity {
  @ManyToOne(() => Lot, (lot) => lot.attributes)
  lot!: Relation<Lot>;

  @ManyToOne(() => Attribute)
  attribute!: Relation<Attribute>;

  @Column()
  value!: string;
}
