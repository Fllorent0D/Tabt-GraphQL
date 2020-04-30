import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentrounds', { schema: 'tabt' })
@Index('round_id', ['round_id'], { unique: true })
export class TournamentRounds {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'tournament_id'
  })
  tournament_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'serie_id'
  })
  serie_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'round_number'
  })
  round_number: number;

  @Column('int', {
    nullable: true,
    unique: true,
    unsigned: true,
    name: 'round_id'
  })
  round_id: number | null;

  @Column('enum', {
    nullable: true,
    enum: ['RR', 'SW', 'DD'],
    name: 'type'
  })
  type: string | null;

  @Column('varchar', {
    nullable: true,
    length: 40,
    name: 'name'
  })
  name: string | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'nb_sets'
  })
  nb_sets: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'3'",
    name: 'min_per_group'
  })
  min_per_group: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'1'",
    name: 'num_qualified_per_group'
  })
  num_qualified_per_group: number | null;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'first_round_count'
  })
  first_round_count: number | null;
}
