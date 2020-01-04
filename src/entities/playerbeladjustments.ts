import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('playerbeladjustments', { schema: 'tabt' })
export class playerbeladjustments {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'1'",
    name: 'first_season'
  })
  first_season: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'class_category'
  })
  class_category: number;

  @Column('date', {
    nullable: false,
    primary: true,
    name: 'date'
  })
  date: string;

  @Column('int', {
    nullable: true,
    default: () => "'500'",
    name: 'points'
  })
  points: number | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('varchar', {
    nullable: true,
    name: 'reason'
  })
  reason: string | null;
}
