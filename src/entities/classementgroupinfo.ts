import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity('classementgroupinfo', { schema: 'tabt' })
export class classementgroupinfo {
  @Column('smallint', {
    nullable: false,
    primary: true,
    default: () => "'0'",
    name: 'group_id'
  })
  group_id: number;

  @Column('tinyint', {
    nullable: true,
    name: 'classementcategory'
  })
  classementcategory: number | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'name'
  })
  name: string | null;

  @Column('int', {
    nullable: false,
    default: () => "'0'",
    name: 'order'
  })
  order: number;
}
