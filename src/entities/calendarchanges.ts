import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('calendarchanges', { schema: 'tabt' })
export class calendarchanges {
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

  @Column('date', {
    nullable: true,
    name: 'date'
  })
  date: string | null;

  @Column('time', {
    nullable: true,
    name: 'time'
  })
  time: string | null;

  @Column('tinyint', {
    nullable: true,
    name: 'home'
  })
  home: number | null;

  @Column('tinyint', {
    nullable: true,
    name: 'away'
  })
  away: number | null;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'address_club_id'
  })
  address_club_id: number | null;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'address_id'
  })
  address_id: number | null;
}
