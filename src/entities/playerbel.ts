import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('playerbel', { schema: 'tabt' })
@Index('playerbel_date', ['first_season', 'date', 'class_category'])
export class playerbel {
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

  @Column('int', {
    nullable: true,
    default: () => "'0'",
    name: 'bonus'
  })
  bonus: number | null;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'count'
  })
  count: number;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'season_count'
  })
  season_count: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'position'
  })
  position: number | null;
}
