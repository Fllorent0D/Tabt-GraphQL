import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import {Field, ObjectType} from 'type-graphql';

@ObjectType()
@Entity('calendartypeinfo', { schema: 'tabt' })
export class CalendarTypeInfo {
  @Field()
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 60,
    name: 'name'
  })
  name: string;

  @Field()
  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'nb_team'
  })
  nb_team: number;

  @Column('tinyint', {
    nullable: false,
    unsigned: true,
    default: () => "'1'",
    name: 'competition_id'
  })
  competition_id: number;
}
