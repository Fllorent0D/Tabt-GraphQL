import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('playerlastelo', { schema: 'tabt' })
export class PlayerLastELO {
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
