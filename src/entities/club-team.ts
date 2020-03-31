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
import {Club} from './club';
import {CacheControl} from '../middlewares/cache-control';

@ObjectType()
@Entity('divisionteaminfo', {schema: 'tabt'})
export class ClubTeam {

  @Field(() => Division)
  division: Division;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'div_id'
  })
  div_id: number;

  @Field(() => Club)
  club: Club;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'team_id'
  })
  team_id: number;

  @Column('smallint', {
    nullable: true,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'club_id'
  })
  club_id: number | null;

  @Field()
  @Column('char', {
    nullable: true,
    default: () => "'?'",
    name: 'indice'
  })
  indice: string | null;

  @Column('tinyint', {
    nullable: true,
    default: () => "'0'",
    name: 'day_in_week'
  })
  day_in_week: number | null;

  @Column('time', {
    nullable: true,
    default: () => "'19:45:00'",
    name: 'hour'
  })
  hour: string | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'max_team_value'
  })
  max_team_value: number | null;

  @Column('smallint', {
    nullable: true,
    name: 'start_points'
  })
  start_points: number | null;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'address_id'
  })
  address_id: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'is_bye'
  })
  is_bye: number;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N', '1', '2'],
    name: 'is_withdraw'
  })
  is_withdraw: string;

  @Column('enum', {
    nullable: false,
    default: () => "'Y'",
    enum: ['Y', 'N'],
    name: 'in_classement'
  })
  in_classement: string;
}
