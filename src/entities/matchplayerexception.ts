import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('matchplayerexception', { schema: 'tabt' })
export class matchplayerexception {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'match_id'
  })
  match_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'game_nb'
  })
  game_nb: number;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'home_player_nb'
  })
  home_player_nb: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'away_player_nb'
  })
  away_player_nb: number | null;
}
