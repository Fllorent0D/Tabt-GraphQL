import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('nationalities', { schema: 'tabt' })
export class nationalities {
  @Column('char', {
    nullable: false,
    primary: true,
    length: 2,
    name: 'code'
  })
  code: string;

  @Column('varchar', {
    nullable: false,
    length: 60,
    name: 'name'
  })
  name: string;
}
