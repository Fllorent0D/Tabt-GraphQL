import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('classementtypeinfo', { schema: 'tabt' })
export class classementtypeinfo {
  @Column('tinyint', {
    nullable: true,
    width: 1,
    name: 'id'
  })
  @PrimaryColumn()
  id: boolean | null;

  @Column('varchar', {
    nullable: true,
    length: 150,
    name: 'name'
  })
  name: string | null;

  @Column('varchar', {
    nullable: true,
    length: 9,
    name: 'show'
  })
  show: string | null;

  @Column('double', {
    nullable: true,
    precision: 22,
    name: 'order'
  })
  order: number | null;
}
