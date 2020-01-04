import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('competitioninfo', { schema: 'tabt' })
export class competitioninfo {
  @PrimaryGeneratedColumn({
    type: 'tinyint',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 40,
    name: 'name'
  })
  name: string;
}
