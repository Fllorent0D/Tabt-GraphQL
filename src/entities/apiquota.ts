import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('apiquota', { schema: 'tabt' })
export class apiquota {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'player_id'
  })
  player_id: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'quota'
  })
  quota: number;
}
