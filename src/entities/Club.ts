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
  PrimaryGeneratedColumn
} from 'typeorm';
import {Venue} from './Venue';
import {ClubCategory} from './ClubCategory';
import {PlayerClub} from './PlayerClub';
import {Field, ID, ObjectType} from 'type-graphql';
import {PlayerInfo} from './PlayerInfo';
import {ClubTeam} from './ClubTeam';
import {CacheControl} from '../middlewares/cache-control';

@ObjectType()
@Entity('clubs', {schema: 'tabt'})
export class Club {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    name: 'id'
  })
  readonly id: number;

  @Column({name: "category"})
  categoryId: number;

  @Field(() => ClubCategory)
  category: ClubCategory;

  @Field()
  @Column('varchar', {
    nullable: false,
    name: 'name'
  })
  name: string;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 20,
    name: 'short_name'
  })
  short_name: string | null;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'indice'
  })
  index: string | null;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'site'
  })
  site: string | null;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'admin_name'
  })
  admin_name: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'admin_mail'
  })
  admin_mail: string | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'is_english'
  })
  is_english: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'is_french'
  })
  is_french: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'is_dutch'
  })
  is_dutch: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    default: () => "'0'",
    name: 'is_german'
  })
  is_german: number | null;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'is_dead'
  })
  is_dead: number;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'first_season'
  })
  first_season: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'last_season'
  })
  last_season: number | null;

  @Column('enum', {
    nullable: true,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'is_category_default'
  })
  is_category_default: string | null;

  @Field(() => [Venue])
  address: Venue[];

  @Field(type => [ClubTeam])
  teams: ClubTeam[];

  @Field(() => [PlayerInfo], {complexity: 2})
  members: PlayerInfo[];


  // Do not use
  players_club?: PlayerClub[];
}
