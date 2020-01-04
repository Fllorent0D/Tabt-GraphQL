import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentseries', { schema: 'tabt' })
@Index('tournament_id', ['tournament_id'])
export class tournamentseries {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'tournament_id'
  })
  tournament_id: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'name'
  })
  name: string;

  @Column('enum', {
    nullable: false,
    default: () => "'single'",
    enum: ['single', 'double', 'mixed'],
    name: 'serie_type'
  })
  serie_type: string;

  @Column('int', {
    nullable: true,
    name: 'internal_id'
  })
  internal_id: number | null;

  @Column('enum', {
    nullable: false,
    default: () => "'All'",
    enum: ['M', 'F', 'All'],
    name: 'sex'
  })
  sex: string;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'classementcategory'
  })
  classementcategory: number | null;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'birthyear_from'
  })
  birthyear_from: number | null;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'birthyear_to'
  })
  birthyear_to: number | null;

  @Column('mediumtext', {
    nullable: true,
    name: 'player_categories'
  })
  player_categories: string | null;

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

  @Column('mediumtext', {
    nullable: false,
    name: 'classements'
  })
  classements: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'statutes'
  })
  statutes: string | null;

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
    default: () => "'3'",
    name: 'nb_sets'
  })
  nb_sets: number;

  @Column('tinyint', {
    nullable: true,
    default: () => "'0'",
    name: 'round_count'
  })
  round_count: number | null;

  @Column('float', {
    nullable: true,
    precision: 12,
    name: 'price'
  })
  price: number | null;

  @Column('smallint', {
    nullable: false,
    default: () => "'0'",
    name: 'max_players'
  })
  max_players: number;

  @Column('enum', {
    nullable: false,
    default: () => "'y'",
    enum: ['y', 'n'],
    name: 'on_player_card'
  })
  on_player_card: string;

  @Column('smallint', {
    nullable: true,
    unsigned: true,
    name: 'club_category'
  })
  club_category: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'bel_category'
  })
  bel_category: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'regularity_ranking_type'
  })
  regularity_ranking_type: number | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'sync_series'
  })
  sync_series: string | null;
}
