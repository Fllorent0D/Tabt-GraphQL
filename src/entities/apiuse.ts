import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('apiuse', { schema: 'tabt' })
export class apiuse {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'player_id'
  })
  player_id: number | null;

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'ip'
  })
  ip: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'function'
  })
  function: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'time'
  })
  time: number;

  @Column('double', {
    nullable: false,
    precision: 22,
    name: 'called'
  })
  called: number;
}
