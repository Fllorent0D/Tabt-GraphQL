import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('matchplayer', { schema: 'tabt' })
@Index('home_player_id', ['home_player_id'])
@Index('away_player_id', ['away_player_id'])
export class matchplayer {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'match_id'
  })
  match_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_nb'
  })
  player_nb: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    width: 1,
    default: () => "'1'",
    name: 'team_nb'
  })
  team_nb: boolean;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'home_player_id'
  })
  home_player_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'away_player_id'
  })
  away_player_id: number | null;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home_vict'
  })
  home_vict: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away_vict'
  })
  away_vict: number;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'home_def'
  })
  home_def: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'away_def'
  })
  away_def: number | null;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home_wo'
  })
  home_wo: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away_wo'
  })
  away_wo: number;
}
