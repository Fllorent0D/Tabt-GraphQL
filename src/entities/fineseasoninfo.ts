import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('fineseasoninfo', { schema: 'tabt' })
export class fineseasoninfo {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'5'",
    name: 'level_id'
  })
  level_id: number;

  @Column('mediumint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'fine_id'
  })
  fine_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('char', {
    nullable: true,
    length: 10,
    name: 'fine_nr'
  })
  fine_nr: string | null;

  @Column('float', {
    nullable: false,
    default: () => "'0'",
    precision: 12,
    name: 'value'
  })
  value: number;

  @Column('float', {
    nullable: true,
    precision: 12,
    name: 'max_value'
  })
  max_value: number | null;

  @Column('mediumint', {
    nullable: true,
    unsigned: true,
    name: 'order'
  })
  order: number | null;
}
