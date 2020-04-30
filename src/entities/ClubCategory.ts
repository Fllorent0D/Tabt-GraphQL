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
import {Club} from './Club';
import {Field, ID, ObjectType} from 'type-graphql';
import {Level} from './Level';

@ObjectType()
@Entity('clubcategories', {schema: 'tabt'})
export class ClubCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    name: 'name'
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
    default: () => "':1:2:'",
    name: 'levels'
  })
  levels_ids: string;

  @Field(() => [Level])
  levels: Level[];

  @Column('tinyint', {
    nullable: false,
    default: () => "'0'",
    name: 'menu_order'
  })
  menu_order: number;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'group'
  })
  group: string | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'main_level'
  })
  main_level: number | null;

  @Field(() => [Club])
  @OneToMany(type => Club, club => club.category)
  clubs: Promise<Club[]>;

}
