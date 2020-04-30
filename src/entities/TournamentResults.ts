import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentresults', { schema: 'tabt' })
@Index('serie_id', ['serie_id'])
@Index('player_id', ['player_id'])
@Index('opponent_id', ['opponent_id'])
export class TournamentResults {
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

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'serie_id'
  })
  serie_id: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'round_id'
  })
  round_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'match_id'
  })
  match_id: number | null;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'opponent_id'
  })
  opponent_id: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'player_score'
  })
  player_score: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'opponent_score'
  })
  opponent_score: number;

  @Column('enum', {
    nullable: true,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'player_wo'
  })
  player_wo: string | null;

  @Column('enum', {
    nullable: true,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'opponent_wo'
  })
  opponent_wo: string | null;
}
