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
import {PlayerClub} from './playerClub';
import {Field, ID, ObjectType} from 'type-graphql';
import {Club} from './club';

@ObjectType()
@Entity('playerinfo', {schema: 'tabt'})
@Index('vttl_index', ['vttl_index'], {unique: true})
export class PlayerInfo {

  @Field(() => ID)
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  readonly id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'first_name'
  })
  first_name: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'last_name'
  })
  last_name: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 60,
    name: 'email'
  })
  email: string;

  @Field()
  @Column('varchar', {
    nullable: true,
    name: 'emailcc'
  })
  emailcc: string | null;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'photo_filename'
  })
  photo_filename: string | null;

  @Field()
  @Column('date', {
    nullable: true,
    name: 'birthdate'
  })
  birthdate: string | null;

  @Field()
  @Column('mediumint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'index'
  })
  index: number;

  @Field()
  @Column('int', {
    nullable: true,
    unique: true,
    unsigned: true,
    name: 'vttl_index'
  })
  vttl_index: number | null;

  @Field()
  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'national_number'
  })
  nationalNumber: string | null;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'address'
  })
  address: string;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'postcode'
  })
  postcode: number;

  @Column('enum', {
    nullable: true,
    enum: ['M', 'F'],
    name: 'sex'
  })
  sex: string | null;

  @Column('char', {
    nullable: false,
    length: 2,
    default: () => "'BE'",
    name: 'nationality'
  })
  nationality: string;

  @Column('varchar', {
    nullable: true,
    length: 15,
    name: 'home_phone'
  })
  home_phone: string | null;

  @Column('varchar', {
    nullable: true,
    length: 15,
    name: 'office_phone'
  })
  office_phone: string | null;

  @Column('varchar', {
    nullable: true,
    length: 15,
    name: 'fax'
  })
  fax: string | null;

  @Column('varchar', {
    nullable: true,
    length: 15,
    name: 'gsm'
  })
  gsm: string | null;

  @Column('text', {
    nullable: true,
    name: 'comment'
  })
  comment: string | null;

  @Column('date', {
    nullable: true,
    name: 'medic_validity'
  })
  medic_validity: string | null;

  @Column('enum', {
    nullable: false,
    default: () => "'N'",
    enum: ['Y', 'N'],
    name: 'is_anonymous'
  })
  is_anonymous: string;

  @Field(() => Club)
  club: Club;

  player_club: PlayerClub;

}
