import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('preferencevalues', { schema: 'tabt' })
export class preferencevalues {
  @Column('mediumint', {
    nullable: false,
    unsigned: true,
    default: () => "'0'",
    name: 'id'
  })
  @PrimaryColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 2,
    name: 'lang'
  })
  lang: string | null;

  @Column('int', {
    nullable: true,
    name: 'key_id'
  })
  key_id: number | null;

  @Column('tinyint', {
    nullable: true,
    name: 'site_id'
  })
  site_id: number | null;

  @Column('longtext', {
    nullable: true,
    name: 'value'
  })
  value: string | null;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'modified'
  })
  modified: Date;

  @Column('int', {
    nullable: true,
    name: 'modified_by'
  })
  modified_by: number | null;
}
