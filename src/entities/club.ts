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
import {Venue} from './venue';
import {ClubCategory} from './club-category';
import {PlayerClub} from './playerClub';
import {Field, ID, ObjectType} from 'type-graphql';
import {PlayerInfo} from './player-info';

@ObjectType()
@Entity('clubs', {schema: 'tabt'})
export class Club {
  @Field(() => ID)
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    name: 'id'
  })
  readonly id: number;

  @Field(() => ClubCategory)
  @ManyToOne(type => ClubCategory)
  @JoinColumn({name: "category"})
  category: Promise<ClubCategory>;

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
  indice: string | null;

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
  @OneToMany(() => Venue, (addressinfo) => addressinfo.club)
  address: Promise<Venue[]>;

  @OneToMany(() => PlayerClub, playerClub => playerClub.club)
  playersClub: Promise<PlayerClub[]>;

  @Field()
  teams: string;

  @Field(() => [PlayerInfo])
  members: Promise<PlayerInfo[]>;
}
