import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('calendarweekname', { schema: 'tabt' })
@Index('name', ['name'])

export class CalendarWeekName {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'calendar_id'
  })
  calendar_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'week'
  })
  week: number;

  @Column('char', {
    nullable: false,
    length: 3,
    default: () => "'0'",
    name: 'name'
  })
  name: string;
}
