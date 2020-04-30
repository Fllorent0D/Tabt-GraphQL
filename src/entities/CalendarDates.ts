import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('calendardates', { schema: 'tabt' })
@Index('calendardate_id', ['calendardate_id'])
export class CalendarDates {
  @PrimaryGeneratedColumn({
    type: 'mediumint',
    unsigned: true,
    name: 'calendardate_id'
  })
  calendardate_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'week'
  })
  week: number;

  @Column('date', {
    nullable: false,
    name: 'date'
  })
  date: string;
}
