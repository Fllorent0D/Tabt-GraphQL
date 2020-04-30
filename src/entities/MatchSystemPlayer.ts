import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import {Field, ObjectType} from 'type-graphql';
import {MatchSystem} from './MatchSystem';

@ObjectType()
@Entity('matchtypeplayer', { schema: 'tabt' })
export class MatchSystemPlayer {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'match_type_id'
  })
  match_type_id: number;

  @Field()
  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'game_nb'
  })
  game_nb: number;

  @Field()
  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_nb'
  })
  player_nb: number;

  @Field()
  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home_player'
  })
  home_player: number;

  @Field()
  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away_player'
  })
  away_player: number;

  @Field()
  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'game_group'
  })
  game_group: number | null;

  @Field()
  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'allow_substitute'
  })
  allow_substitute: string;

  @Field(() => MatchSystem)
  @ManyToOne(() => MatchSystem, matchSystem => matchSystem.players)
  @JoinColumn({
    name: 'match_type_id'
  })
  matchSystem: Promise<MatchSystem>;
}
