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

import {Division} from './Division';

@ObjectType()
@Entity('divisioncategories', {schema: 'tabt'})
export class DivisionCategory {

  @Field()
  @PrimaryGeneratedColumn({
    type: 'tinyint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'name'
  })
  name: string;

  @Column('tinyint', {
    nullable: true,
    name: 'classementcategory'
  })
  classementcategory: number | null;

  @Column('tinyint', {
    nullable: false,
    name: 'playercategory'
  })
  playercategory: number;

  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'division_name_prefix'
  })
  division_name_prefix: string | null;

  @Column('tinyint', {
    nullable: true,
    name: 'first_season'
  })
  first_season: number | null;

  @Column('tinyint', {
    nullable: true,
    name: 'last_season'
  })
  last_season: number | null;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'order'
  })
  order: number;

  @Field(() => [Division])
  @OneToMany(() => Division, division => division.category)
  divisions: Promise<Division[]>;

}
