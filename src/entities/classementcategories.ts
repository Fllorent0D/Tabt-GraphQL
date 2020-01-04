import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('classementcategories', { schema: 'tabt' })
export class classementcategories {
  @Column('smallint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'name'
  })
  name: string | null;
}
