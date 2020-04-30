import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import {Field, ObjectType} from 'type-graphql';
@ObjectType()
@Entity('playerelo', { schema: 'tabt' })
export class PlayerELOHistory {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'1'",
    name: 'first_season'
  })
  first_season: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'class_category'
  })
  class_category: number;

  @Column('date', {
    nullable: false,
    primary: true,
    name: 'date'
  })
  dateString: string;

  @Field()
  date: Date;

  @Field()
  @Column('int', {
    nullable: true,
    default: () => "'500'",
    name: 'points'
  })
  points: number | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;
}
