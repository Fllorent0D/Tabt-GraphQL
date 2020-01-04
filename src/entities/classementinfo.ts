import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('classementinfo', { schema: 'tabt' })
export class classementinfo {
  @Column('smallint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'id'
  })
  id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'category'
  })
  category: number;

  @Column('varchar', {
    nullable: false,
    length: 4,
    name: 'name'
  })
  name: string;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'order'
  })
  order: number | null;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'elo_value'
  })
  elo_value: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'bel_value'
  })
  bel_value: number;

  @Column('int', {
    nullable: false,
    default: () => "'0'",
    name: 'team_value'
  })
  team_value: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'absolute_value'
  })
  absolute_value: number;
}
