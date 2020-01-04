import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('clubresponsibles', { schema: 'tabt' })
export class clubresponsibles {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('tinyint', {
    nullable: false,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'club_id'
  })
  club_id: number;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'responsability_id'
  })
  responsability_id: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'player_id'
  })
  player_id: number;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'modified_by'
  })
  modified_by: number;
}
