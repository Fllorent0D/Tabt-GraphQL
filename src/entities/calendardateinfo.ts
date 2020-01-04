import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('calendardateinfo', { schema: 'tabt' })
export class calendardateinfo {
  @PrimaryGeneratedColumn({
    type: 'mediumint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('tinyint', {
    nullable: false,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'calendar_id'
  })
  calendar_id: number;

  @Column('varchar', {
    nullable: false,
    length: 80,
    name: 'name'
  })
  name: string;
}
