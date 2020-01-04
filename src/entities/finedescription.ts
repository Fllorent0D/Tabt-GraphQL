import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('finedescription', { schema: 'tabt' })
export class finedescription {
  @Column('mediumint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'fine_id'
  })
  fine_id: number;

  @Column('char', {
    nullable: false,
    primary: true,
    length: 2,
    name: 'lang'
  })
  lang: string;

  @Column('varchar', {
    nullable: true,
    name: 'description'
  })
  description: string | null;
}
