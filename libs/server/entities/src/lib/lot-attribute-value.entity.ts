import type { Relation } from 'typeorm';
import { Column, Entity, ManyToOne } from 'typeorm';

import { AttributeEntity } from './attribute.entity';
import { AbstractOrmEntity } from './base.entity';
import { LotEntity } from './lot.entity';

@Entity('lot_attribute_values')
export class LotAttributeValueEntity extends AbstractOrmEntity {
  @ManyToOne(() => LotEntity, (lot) => lot.attributes)
  lot!: Relation<LotEntity>;

  @ManyToOne(() => AttributeEntity)
  attribute!: Relation<AttributeEntity>;

  @Column()
  value!: string;
}
