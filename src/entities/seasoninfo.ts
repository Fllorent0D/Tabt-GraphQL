import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('seasoninfo', { schema: 'tabt' })
export class seasoninfo {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'name'
  })
  name: string;

  @Column('date', {
    nullable: false,
    name: 'start_date'
  })
  start_date: string;

  @Column('date', {
    nullable: false,
    name: 'stop_date'
  })
  stop_date: string;

  @Column('date', {
    nullable: true,
    name: 'competition_start_date'
  })
  competition_start_date: string | null;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'elo_correction'
  })
  elo_correction: number;
}
