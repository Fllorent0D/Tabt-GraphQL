import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('finedeviations', { schema: 'tabt' })
export class FineDeviations {

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'deviation_type'
  })
  deviation_type: number;

  @Column('mediumint', {
    nullable: false,
    name: 'fine_id'
  })
  @PrimaryColumn()
  fine_id: number;
}
