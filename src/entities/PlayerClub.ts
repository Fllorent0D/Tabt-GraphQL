import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import {Club} from './Club';
import {PlayerInfo} from './PlayerInfo';

@Entity('playerclub', { schema: 'tabt' })
@Index('season_club', ['season', 'club_id'])
export class PlayerClub {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'club_id'
  })
  club_id: number;

  @ManyToOne(type => Club)
  @JoinColumn({
    name: 'club_id'
  })
  club: Club;

  @ManyToOne(type => PlayerInfo)
  @JoinColumn({
    name: 'player_id'
  })
  player: PlayerInfo;

}
