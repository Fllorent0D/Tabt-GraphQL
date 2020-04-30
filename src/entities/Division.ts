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
import {Field, ID, ObjectType} from 'type-graphql';
import {ClubTeam} from './ClubTeam';

import {DivisionCategory} from './DivisionCategory';
import {Level} from './Level';
import {MatchSystem} from './MatchSystem';
import {MatchResult} from './MatchResult';

@ObjectType()
@Entity('divisioninfo', {schema: 'tabt'})
@Index('id', ['id'])
export class Division {
  @Field(() => ID)
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
    name: 'div_id'
  })
  div_id: number;

  @Field()
  @Column('char', {
    nullable: false,
    default: () => "'?'",
    name: 'serie'
  })
  serie: string;

  @Column('mediumint', {
    nullable: false,
    default: () => "'1'",
    name: 'order'
  })
  order: number;

  @Column({
    name: 'level'
  })
  level_id: number;


  @Column({
    name: 'category'
  })
  category_id: number;


  @Field()
  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'calendar_id'
  })
  calendar_id: number;

  @Field()
  @Column('mediumint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'calendardate_id'
  })
  calendardate_id: number;

  @Field()
  @Column('smallint', {
    nullable: true,
    default: () => "'1'",
    name: 'first_match_nb'
  })
  first_match_nb: number | null;

  @Column('smallint', {
    name: 'match_type_id'
  })
  match_type_id: MatchSystem;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'50'",
    name: 'top50_limit'
  })
  top50_limit: number;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'100'",
    name: 'match_value'
  })
  match_value: number;

  @Column('enum', {
    nullable: false,
    default: () => "'-5'",
    enum: ['-6', '-5'],
    name: 'week_start_on'
  })
  week_start_on: string;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'is_youth_division'
  })
  is_youth_division: string;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'min_age_category'
  })
  min_age_category: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'max_age_category'
  })
  max_age_category: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'min_nb_youth_players'
  })
  min_nb_youth_players: number | null;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'extra_name'
  })
  extra_name: string | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'wo_as_vict'
  })
  wo_as_vict: string;

  @Column('enum', {
    nullable: true,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'wo_is_one_point'
  })
  wo_is_one_point: string | null;

  @Column('varchar', {
    nullable: false,
    length: 100,
    default: () => "'#WEEKNAME#/#MATCHNAME#'",
    name: 'match_number_scheme'
  })
  match_number_scheme: string;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'classement_type'
  })
  classement_type: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'bel_category'
  })
  bel_category: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'control_group_id'
  })
  control_group_id: number;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'use_start_points'
  })
  use_start_points: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'type'
  })
  type: number;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'source_category'
  })
  source_category: number | null;

  @Column('tinyint', {
    nullable: true,
    default: () => "'0'",
    name: 'draw_type'
  })
  draw_type: number | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'auto_validation'
  })
  auto_validation: string;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'responsible_id'
  })
  responsible_id: number | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'fixed_team'
  })
  fixed_team: string;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'promoted_teams'
  })
  promoted_teams: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'relegated_teams'
  })
  relegated_teams: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'team_score_limit_day'
  })
  team_score_limit_day: number | null;

  @Column('time', {
    nullable: true,
    name: 'team_score_limit_time'
  })
  team_score_limit_time: string | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'detailed_score_limit_day'
  })
  detailed_score_limit_day: number | null;

  @Column('time', {
    nullable: true,
    name: 'detailed_score_limit_time'
  })
  detailed_score_limit_time: string | null;

  @Column('enum', {
    nullable: true,
    enum: ['Match', 'Week'],
    name: 'detailed_score_limit_method'
  })
  detailed_score_limit_method: string | null;

  @Column('enum', {
    nullable: true,
    enum: ['Match', 'Week'],
    name: 'team_score_limit_method'
  })
  team_score_limit_method: string | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'validated_by'
  })
  validated_by: number | null;

  @Field(() => [MatchResult])
  matches: MatchResult[];

  @Field(type => [ClubTeam])
  teams: ClubTeam[];

  @Field(() => Level)
  level: Level;

  @Field(() => DivisionCategory)
  category: DivisionCategory;
}
