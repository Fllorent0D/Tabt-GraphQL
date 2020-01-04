import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('domaines', { schema: 'tabt' })
export class domaines {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'code'
  })
  code: number;

  @Column('char', {
    nullable: false,
    length: 20,
    name: 'domaine'
  })
  domaine: string;

  @Column('char', {
    nullable: false,
    length: 50,
    name: 'description'
  })
  description: string;
}
