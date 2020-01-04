import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('divisionresults', { schema: 'tabt' })
@Index('match_id', ['match_id'])
export class divisionresults {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'div_id'
  })
  div_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'week'
  })
  week: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'match_nb'
  })
  match_nb: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home'
  })
  home: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away'
  })
  away: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'sets_home'
  })
  sets_home: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'sets_away'
  })
  sets_away: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'match_id'
  })
  match_id: number;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['N', 'Y'],
    name: 'home_wo'
  })
  home_wo: string;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['N', 'Y'],
    name: 'away_wo'
  })
  away_wo: string;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'score_modified'
  })
  score_modified: string;

  @Column('timestamp', {
    nullable: true,
    name: 'validation_timestamp'
  })
  validation_timestamp: Date | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'validated_by'
  })
  validated_by: number | null;

  @Column('enum', {
    nullable: true,
    enum: ['B', 'H', 'A', 'N'],
    name: 'lock_type'
  })
  lock_type: string | null;

  @Column('timestamp', {
    nullable: true,
    name: 'lock_timestamp'
  })
  lock_timestamp: Date | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'locked_by'
  })
  locked_by: number | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'last_modified'
  })
  last_modified: Date;
}
