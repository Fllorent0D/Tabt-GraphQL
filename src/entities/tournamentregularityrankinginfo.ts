import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentregularityrankinginfo', { schema: 'tabt' })
export class tournamentregularityrankinginfo {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'name'
  })
  name: string;
}
