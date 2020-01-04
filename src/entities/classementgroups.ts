import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('classementgroups', { schema: 'tabt' })
export class classementgroups {
  @Column('smallint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'group_id'
  })
  group_id: number;

  @Column('tinyint', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'classement_id'
  })
  classement_id: number;
}
