import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import {Club} from './club';
import {Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
@Entity('clubaddressinfo', { schema: 'tabt' })
export class Venue {
  @Field(() => ID)
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Field(() => Club)
  @Column({
    name: 'club_id'
  })
  clubId: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'address_id'
  })
  address_id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'name'
  })
  name: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'address'
  })
  address: string;

  @Field()
  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'zip'
  })
  zip: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'town'
  })
  town: string;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 15,
    name: 'phone'
  })
  phone: string | null;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 15,
    name: 'fax'
  })
  fax: string | null;

  @Field()
  @Column('mediumtext', {
    nullable: true,
    name: 'comment'
  })
  comment: string | null;
}
