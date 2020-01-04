import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('controlresults', { schema: 'tabt' })
@Index('FK_controltype', ['control_group_id'])
export class controlresults {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('tinyint', {
    nullable: false,
    name: 'season'
  })
  season: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'control_group_id'
  })
  control_group_id: number;

  @Column('varchar', {
    nullable: false,
    length: 3,
    name: 'wname'
  })
  wname: string;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'div_id'
  })
  div_id: number | null;

  @Column('tinyint', {
    nullable: true,
    unsigned: true,
    name: 'match_nb'
  })
  match_nb: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'match_id'
  })
  match_id: number | null;

  @Column('int', {
    nullable: true,
    unsigned: true,
    name: 'deviation_type'
  })
  deviation_type: number | null;

  @Column('blob', {
    nullable: true,
    name: 'data'
  })
  data: Buffer | null;
}
