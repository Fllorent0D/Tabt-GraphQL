import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('matchinfo', { schema: 'tabt' })
export class matchinfo {
  @PrimaryGeneratedColumn({
    type: 'int',
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

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'competition_id'
  })
  competition_id: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'category'
  })
  category: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'match_type_id'
  })
  match_type_id: number;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home_club'
  })
  home_club: number;

  @Column('char', {
    nullable: false,
    name: 'home_indice'
  })
  home_indice: string;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away_club'
  })
  away_club: number;

  @Column('char', {
    nullable: false,
    name: 'away_indice'
  })
  away_indice: string;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home_score'
  })
  home_score: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away_score'
  })
  away_score: number;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'match_ok'
  })
  match_ok: string;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'home_captain_player_id'
  })
  home_captain_player_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'away_captain_player_id'
  })
  away_captain_player_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'referee_player_id'
  })
  referee_player_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'room_responsible_player_id'
  })
  room_responsible_player_id: number | null;

  @Column('timestamp', {
    nullable: true,
    name: 'end_time'
  })
  end_time: Date | null;
}
