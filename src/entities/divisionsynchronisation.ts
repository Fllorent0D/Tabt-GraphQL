import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('divisionsynchronisation', { schema: 'tabt' })
export class divisionsynchronisation {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('tinyint', {
    nullable: false,
    default: () => "'0'",
    name: 'season'
  })
  season: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'div_id'
  })
  div_id: number;

  @Column('varchar', {
    nullable: false,
    length: 10,
    default: () => "'af'",
    name: 'type'
  })
  type: string;

  @Column('longtext', {
    nullable: true,
    name: 'data'
  })
  data: string | null;
}
