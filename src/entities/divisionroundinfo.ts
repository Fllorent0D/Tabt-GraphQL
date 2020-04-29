import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('divisionroundinfo', { schema: 'tabt' })
export class divisionroundinfo {
  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'div_id'
  })
  @PrimaryColumn()
  div_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'season'
  })
  @PrimaryColumn()
  season: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'week'
  })
  @PrimaryColumn()
  week: number;

  @Column('varchar', {
    nullable: false,
    length: 50,
    default: () => "'0'",
    name: 'name'
  })
  name: string;

  @Column('int', {
    nullable: false,
    default: () => "'0'",
    name: 'nb_team'
  })
  nb_team: string;

  @Column('enum', {
    nullable: false,
    enum: ['Y', 'N'],
    default: () => "'N'",
    name: 'is_validated'
  })
  is_validated: 'Y' | 'N';

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'check_week'
  })
  check_week: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'check_count'
  })
  check_count: number;



}
