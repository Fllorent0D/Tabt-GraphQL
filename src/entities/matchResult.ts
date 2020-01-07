import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm';
import {Field, ObjectType} from 'type-graphql';
import {Division} from './division';
import {ClubTeam} from './club-team';
import {Club} from './club';
import {MatchInfo} from './matchInfo';

@ObjectType()
@Entity('divisionresults', {schema: 'tabt'})
@Index('match_id', ['match_id'])
export class MatchResult {

  @Field(() => MatchInfo)
  @OneToOne(() => MatchInfo, match => match.matchResult)
  @JoinColumn({
    name:'match_id'
  })
  matchInfo: Promise<MatchInfo>;


  @Field(() => Division)
  @ManyToOne(() => Division, division => division.matches)
  @JoinColumn({
    name: 'div_id'
  })
  division: Promise<Division>;

  @Column('tinyint', {
    nullable: false,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'week'
  })
  week: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'match_nb'
  })
  match_nb: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'home'
  })
  home: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'away'
  })
  away: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'sets_home'
  })
  sets_home: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'sets_away'
  })
  sets_away: number;

  @Field()
  @PrimaryColumn('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'match_id'
  })
  match_id: number;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['N', 'Y'],
    name: 'home_wo'
  })
  home_wo: string;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['N', 'Y'],
    name: 'away_wo'
  })
  away_wo: string;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'score_modified'
  })
  score_modified: string;

  @Column('timestamp', {
    nullable: true,
    name: 'validation_timestamp'
  })
  validation_timestamp: Date | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'validated_by'
  })
  validated_by: number | null;

  @Column('enum', {
    nullable: true,
    enum: ['B', 'H', 'A', 'N'],
    name: 'lock_type'
  })
  lock_type: string | null;

  @Column('timestamp', {
    nullable: true,
    name: 'lock_timestamp'
  })
  lock_timestamp: Date | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'locked_by'
  })
  locked_by: number | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'last_modified'
  })
  last_modified: Date;

  @Field(() => ClubTeam, {nullable: true})
  awayTeam: ClubTeam;

  @Field(() => ClubTeam, {nullable: true})
  homeTeam: ClubTeam;

}
