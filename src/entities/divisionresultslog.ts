import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('divisionresultslog', { schema: 'tabt' })
@Index('div_id', ['div_id', 'season'])
@Index('season_modified', ['season', 'modified'])
export class divisionresultslog {
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

  @Column('timestamp', {
    nullable: false,
    primary: true,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'modified_by'
  })
  modified_by: number;

  @Column('enum', {
    nullable: false,
    primary: true,
    default: () => "'S'",
    enum: ['S', 'M', 'HW', 'AW', 'FF', 'DC', 'DM', 'DD', 'CD', 'V', 'C', 'P', 'L', 'VA', 'UV', 'VR'],
    name: 'modification_type'
  })
  modification_type: string;

  @Column('varchar', {
    nullable: true,
    length: 1000,
    name: 'data'
  })
  data: string | null;
}
