import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('divisionteamplayers', { schema: 'tabt' })
export class divisionteamplayers {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'div_id'
  })
  div_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    name: 'season'
  })
  season: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'team_id'
  })
  team_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'player_id'
  })
  player_id: number;
}
