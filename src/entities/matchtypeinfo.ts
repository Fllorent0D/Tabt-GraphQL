import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('matchtypeinfo', { schema: 'tabt' })
export class matchtypeinfo {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 40,
    name: 'name'
  })
  name: string;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'4'",
    name: 'nb_single'
  })
  nb_single: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'nb_double'
  })
  nb_double: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'3'",
    name: 'nb_sets'
  })
  nb_sets: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'11'",
    name: 'nb_points'
  })
  nb_points: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'force_double_teams'
  })
  force_double_teams: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'nb_substitutes'
  })
  nb_substitutes: number;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'nb_single_optional'
  })
  nb_single_optional: number | null;
}
