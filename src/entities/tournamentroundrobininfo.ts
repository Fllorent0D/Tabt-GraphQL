import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentroundrobininfo', { schema: 'tabt' })
export class tournamentroundrobininfo {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'round_id'
  })
  round_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'group_id'
  })
  group_id: number;

  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'rule'
  })
  rule: string | null;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'subscribing_id'
  })
  subscribing_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_number'
  })
  player_number: number;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'is_wo'
  })
  is_wo: string;

  @Column('enum', {
    nullable: true,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'is_qualified'
  })
  is_qualified: string | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'is_validated'
  })
  is_validated: string;
}
