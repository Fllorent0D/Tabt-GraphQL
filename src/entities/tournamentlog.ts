import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('tournamentlog', { schema: 'tabt' })
export class tournamentlog {
  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'tournament_id'
  })
  tournament_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'serie_id'
  })
  serie_id: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    default: () => "'0'",
    name: 'modification_id'
  })
  modification_id: number;

  @Column('timestamp', {
    nullable: false,
    primary: true,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'modified_by'
  })
  modified_by: number;

  @Column('varchar', {
    nullable: false,
    primary: true,
    length: 30,
    default: () => "'S'",
    name: 'modification_type'
  })
  modification_type: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'data'
  })
  data: string | null;
}
