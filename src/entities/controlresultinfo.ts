import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('controlresultinfo', { schema: 'tabt' })
@Index('FK_controltype', ['control_group_id'])
@Index('FK_modifiedby', ['modified_by'])
export class controlresultinfo {
  @Column('tinyint', {
    nullable: false,
    primary: true,
    name: 'season'
  })
  season: number;

  @Column('int', {
    nullable: false,
    primary: true,
    unsigned: true,
    name: 'control_group_id'
  })
  control_group_id: number;

  @Column('varchar', {
    nullable: false,
    primary: true,
    length: 3,
    name: 'wname'
  })
  wname: string;

  @Column('enum', {
    nullable: false,
    default: () => "'Initial'",
    enum: ['Initial', 'Running', 'Executed', 'Aborted'],
    name: 'status'
  })
  status: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
    name: 'modified_by'
  })
  modified_by: number;
}
