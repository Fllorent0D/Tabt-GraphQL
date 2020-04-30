import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import {Field, ObjectType} from 'type-graphql';

@Entity('playerstatus', { schema: 'tabt' })
export class PlayerStatus {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('char', {
    nullable: false,
    default: () => "'I'",
    name: 'status'
  })
  statusId: string;
}
